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
                <b-form-select required size="2" v-model="selected" :options="options"></b-form-select>
              </b-form-group>
              <b-button :disabled="disableSubmit" type="submit" variant="success">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </base-header>
         <div class="container-fluid card shadow" :class="type === 'dark' ? 'bg-default': ''">
          <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
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
                  :data="transactionDetail.transactions">
              <template slot="columns">
                <th>Transaction Date</th>
                <th>Amount</th>
                <th>Transaction Type</th>
                <th>Description</th>
                <th>Transaction Number</th>
                <th>Balance</th>
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
      let bankNamesMap = {
        'hdfc': 'HDFC Bank',
        'kotak': 'Kotak Mahindra Bank'
      }
      return bankNamesMap[value] || value
    },
    transactionType: function (value) {
      let transactionTypeMap = {
        '1': 'Credit',
        '2': 'Debit'
      }
      return transactionTypeMap[value.toString()] || ''
    }
  },
  data () {
    return {
      disableSubmit: false,
      file: null,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'kotak', text: 'Kotak Mahindra Bank' },
        { value: 'hdfc', text: 'HDFC Bank' }
      ],
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
      let endpoint = 'statement/upload/'
      let formData = new FormData()
      formData.append('bank_name', this.selected)
      formData.append('statement', this.file)
      let headers = { 'Content-Type': 'multipart/form-data' }
      this.onReset()
      httpRequest(endpoint, 'post', formData, headers, this.postSubmit)
    },
    postSubmit: function (responseData) {
      this.fetchTransactions()
      this.disableSubmit = false
    },
    fetchTransactions: function () {
      let endpoint = 'statement/transactions/'
      httpRequest(endpoint, 'get', {}, {}, this.postTransactions)
    },
    postTransactions: function (responseData) {
      this.transactionDetails = []
      for (let k in responseData.data) {
        this.transactionDetails.push({ 'name': k, 'transactions': responseData.data[k] })
      }
    }
  },
  mounted () {
    this.fetchTransactions()
  }
}
</script>
<style></style>
