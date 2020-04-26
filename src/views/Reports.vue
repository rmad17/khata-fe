<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
          <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="2">
                <label>Transaction Type</label>
              </b-col>
              <b-col sm="3">
                <b-form-select @change="onSubmit" v-model="transactionTypeSelect" :options="transactionTypes"></b-form-select>
              </b-col>
              <b-col sm="2">
                <label>Bank Name</label>
              </b-col>
              <b-col sm="3">
                <b-form-select @change="onSubmit"  v-model="bankNameSelect" :options="bankNames"></b-form-select>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label> Min Amount</label>
              </b-col>
              <b-col sm="3">
                <b-form-input @change="onSubmit" v-model="minAmt" :type="number"></b-form-input>
              </b-col>
              <b-col sm="2">
                <label>Max Amount</label>
              </b-col>
              <b-col sm="3">
                <b-form-input @change="onSubmit" v-model="maxAmt"  :type="number"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label>Start Date</label>
              </b-col>
              <b-col sm="3">
                <b-form-input @change="onSubmit"  v-model="startDate" type="date"></b-form-input>
              </b-col>
              <b-col sm="2">
                <label>End Date</label>
              </b-col>
              <b-col sm="3">
                <b-form-input @change="onSubmit" v-model="endDate"  type="date"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label>Category</label>
              </b-col>
              <b-col sm="3">
                <b-form-select @change="onSubmit" v-model="category" :options="categories"></b-form-select>
              </b-col>
              <!-- <b-col sm="2">
                <label>Tag</label>
              </b-col>
              <b-col sm="3">
                <b-form-select @change="onSubmit"  v-model="tag" :options="categories.tags"></b-form-select>
              </b-col> -->
            </b-row>
          </b-container>
        </base-header>
        <div class="container-fluid card shadow" :class="type === 'dark' ? 'bg-default': ''">
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
    </div>
</template>
<script>

// api
import { httpRequest } from '../api/index.js'

export default {
  name: 'reports',
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
      const endpoint = 'statement/reports/category/' + params
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
