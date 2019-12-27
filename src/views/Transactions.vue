<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
          <!-- Styled -->
          <div class="ml-16 container">
            <b-form class="" id="statement-upload" @submit="onSubmit" @reset="onReset">
              <b-form-group inline>
                <b-form-file
                  variant="primary"
                  accept=".csv, .pdf"
                  required
                  form="statement-upload"
                  v-model="file"
                  :state="Boolean(file)"
                  placeholder="Choose a .csv or .pdf bank statement"
                  drop-placeholder="Drop file here...">
                </b-form-file>
              </b-form-group>
              <b-form-group>
                <b-form-select required size="2" v-model="selected" :options="options.possible_banks"></b-form-select>
              </b-form-group>
              <b-button :disabled="disableSubmit" type="submit" variant="success">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </base-header>
         <div class="container-fluid card shadow" :class="type === 'dark' ? 'bg-default': ''">
          <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="2">
                <label :for="txn-type">Transaction Type</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="txn-type" :type="text"></b-form-input>
              </b-col>
              <b-col sm="2">
                <label :for="bank-name">Bank Name</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="bank-name" :type="text"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label :for="min-amt"> Min Amount</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="min-amt" :type="text"></b-form-input>
              </b-col>
              <b-col sm="2">
                <label :for="max-amt">Max Amount</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="max-amt" :type="text"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label :for="start-date">Start Date</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="start-date" type="date"></b-form-input>
              </b-col>
              <b-col sm="2">
                <label :for="end-date">End Date</label>
              </b-col>
              <b-col sm="3">
                <b-form-input :id="end-date" type="date"></b-form-input>
              </b-col>
            </b-row>
          </b-container>
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
                <th>Description</th>
                <th>Transaction Number</th>
                <th>Balance</th>
                <th>Category</th>
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
                  {{ row.description }}
                </td>
                <td>
                  {{ row.transaction_no }}
                </td>
                <td>
                  {{ row.balance }}
                </td>
                <td>
                  {{ row.category }}
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
  name: 'transactions',
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
      filter: {
        bank: null
      },
      disableSubmit: false,
      file: null,
      selected: null,
      options: {
        possible_banks: [
          { value: null, text: 'Please select an option' },
          { value: 'kotak', text: 'Kotak Mahindra Bank' },
          { value: 'hdfc', text: 'HDFC Bank' }
        ],
        filter_bank: [
          { value: null, text: 'Please select an option' },
          { value: 'hdfc', text: 'HDFC' },
          { value: 'kotak', text: 'Kotak Mahindra' }
        ]
      },
      transactionDetails: [],
      type: 'light'
    }
  },
  computed: {
  },
  methods: {
    onReset: function () {
      this.file = null
      this.selected = null
    },
    onSubmit: function () {
      this.disableSubmit = true
      const endpoint = 'statement/upload/'
      const formData = new FormData()
      formData.append('bank_name', this.selected)
      formData.append('statement', this.file)
      const headers = { 'Content-Type': 'multipart/form-data' }
      this.onReset()
      httpRequest(endpoint, 'post', formData, headers, this.postSubmit)
    },
    postSubmit: function (responseData) {
      this.fetchTransactions()
      this.disableSubmit = false
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
    }
  },
  mounted () {
    this.fetchTransactions()
  }
}
</script>
<style></style>
