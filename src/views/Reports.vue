<template>
    <div>
        <div>
          <transaction-filters>
          </transaction-filters>
          <b-card no-body>
            <b-tabs class="" align="center" pills card>
              <b-tab title="Transactions" active>
                <div class="container-fluid shadow" :class="type === 'dark' ? 'bg-default': ''">
                  <div class="table-responsive" v-for="transactionDetail in transactionDetails" :key=transactionDetail.name>
                    <div class="card-header border-0"
                      :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            {{ transactionDetail.name | bankNames }}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <base-table class="table align-items-center table-flush"
                      :class="type === 'dark' ? 'table-dark': ''"
                      :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                      tbody-classes="list"
                      :filter="filter"
                      :data="transactionDetail.transactions">
                      <template slot="columns">
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Transaction Type</th>
                        <th>Balance</th>
                        <th>Category</th>
                        <th>Transaction Number</th>
                        <th>Description</th>
                      </template>
                      <template slot-scope="{row}">
                        <td class="budget">
                          {{ row.transaction_date }}
                        </td>
                        <td>
                          {{ row.amount }}
                        </td>
                        <td>
                          {{ row.transaction_type | transactionType }}
                        </td>
                        <td>
                          {{ row.balance }}
                        </td>
                        <td>
                          {{ row.category }}
                        </td>
                        <td>
                          {{ row.transaction_no }}
                        </td>
                        <td>
                          {{ row.description }}
                        </td>
                      </template>
                    </base-table>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Visualisation" active>
                <div class="">
                  <visualisation
                    :params="params"
                  ></visualisation>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
    </div>
</template>
<script>
// api
import { httpRequest } from '../api/index.js'

// Child Components
import Visualisation from './Visualisation'
import TransactionFilters from './components/TransactionFilters'

// var moment = require('moment-timezone')
// var a = moment.tz('2013-11-18 11:55', 'Asia/Kolkata')
// console.log('Month: ')
// console.log(a.month)

export default {
  name: 'reports',
  components: { Visualisation, TransactionFilters },
  filters: {
    bankNames: function (value) {
      const bankNamesMap = {
        hdfc: 'HDFC Bank',
        kotak: 'Kotak Mahindra Bank'
      }
      return bankNamesMap[value] || value
    },
    transactionType: function (value) {
      const transactionTypeMap = {
        1: 'Credit',
        2: 'Debit'
      }
      return transactionTypeMap[value.toString()] || ''
    }
  },
  data () {
    return {
      params: '',
      bankNameSelect: '',
      minAmt: 0,
      maxAmt: '',
      category: '',
      tag: '',
      startDate: '',
      endDate: '',
      transactionTypeSelect: '',
      transactionTypes: [
        { value: '', text: 'Credit/Debit' },
        { value: 1, text: 'Credit' },
        { value: 2, text: 'Debit' }
      ],
      bankNames: [
        { value: '', text: 'All Banks' },
        { value: 'kotak', text: 'Kotak Mahindra Bank' },
        { value: 'hdfc', text: 'HDFC Bank' }
      ],
      transactionDetails: [],
      categories: [],
      tags: [],
      type: 'light'
    }
  },
  computed: {
  },
  methods: {
    onSubmit: function () {
      let params = '?'
      if (this.transactionTypeSelect) {
        params += 'transaction_type=' + this.transactionTypeSelect
      }
      if (this.bankNameSelect) {
        params += '&bank_name=' + this.bankNameSelect
      }
      if (this.minAmt) {
        params += '&min_amt=' + this.minAmt
      }
      if (this.maxAmt) {
        params += '&max_amt=' + this.maxAmt
      }
      if (this.category) {
        params += '&category_id=' + this.category
      }
      if (this.tag) {
        params += '&tag=' + this.tag
      }
      if (this.startDate) {
        params += '&start_date=' + this.startDate
      }
      if (this.endDate) {
        params += '&end_date=' + this.endDate
      }
      this.params = params
      const endpoint = 'statement/reports/transactions/' + params
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.postSubmit)
    },
    postSubmit: function (responseData) {
      this.transactionDetails = []
      for (const k in responseData.data) {
        this.transactionDetails.push({ name: k, transactions: responseData.data[k] })
      }
    },
    fetchTransactions: function () {
      const endpoint = 'statement/transactions/'
      httpRequest(endpoint, 'get', {}, {}, this.postTransactions)
    },
    postTransactions: function (responseData) {
      this.transactionDetails = []
      for (const k in responseData.data) {
        this.transactionDetails.push({ name: k, transactions: responseData.data[k] })
      }
    },
    getCategories: function () {
      const endpoint = 'statement/category/all/'
      httpRequest(endpoint, 'get', {}, {}, this.addCategories)
    },
    addCategories: function (responseData) {
      this.categories = []
      this.categories.push({ value: '', text: 'All Categories' })
      for (const i in responseData.data) {
        const c = responseData.data[i]
        this.categories.push({ value: c.id, text: c.name })
      }
      this.onSubmit()
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>
<style></style>
