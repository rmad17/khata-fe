<template>
    <div>
      <b-card class="m-2">
        <transaction-filters @filterChanged="onSubmit">
        </transaction-filters>
      </b-card>
      <b-card class="m-2 mt-2 pt-1">
        <b-tabs align="center" pills card>
          <b-tab title="Transactions" @click="onTxnTabClick">
            <transaction-table :transaction-details="transactionDetails" />
          </b-tab>
          <b-tab title="Visualisation" @click="onVisTabClick" active>
            <div>
              <visualisation :params="params" :active="activeVis"/>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
</template>
<script>
// api
import { httpRequest } from '../api/index.js'

// Child Components
import Visualisation from './components/Visualisation'
import TransactionFilters from './components/TransactionFilters'
import TransactionTable from './components/TransactionTable'

export default {
  name: 'reports',
  components: { Visualisation, TransactionFilters, TransactionTable },
  data () {
    return {
      params: '',
      transactionDetails: [],
      categories: [],
      tags: [],
      type: 'light',
      activeVis: false
    }
  },
  computed: {
  },
  methods: {
    onSubmit: function (params) {
      if (params === undefined) {
        params = ''
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
    onVisTabClick: function () {
      this.activeVis = true
    },
    onTxnTabClick: function () {
      this.activeVis = false
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
