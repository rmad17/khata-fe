<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
         <div class="container-fluid">
          <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table>
        </div>
    </div>
</template>
<script>

// api
import { httpRequest } from '../api/index.js'

export default {
  name: 'transactions',
  data () {
    return {
      fields: [
        { key: 'transaction_date', sortable: true },
        { key: 'description', sortable: true },
        { key: 'transaction_number', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'transaction_type', sortable: true },
        { key: 'value_date', sortable: true },
        { key: 'balance', sortable: true }
      ],
      transactionDetails: []
    }
  },
  computed: {
  },
  methods: {
    fetchTransactions: function () {
      var endpoint = 'statement/transactions/'
      httpRequest(endpoint, 'get', {}, {}, this.postTransactions)
    },
    postTransactions: function (responseData) {
      console.log(responseData)
      this.transactionDetails = responseData.data
    }
  },
  mounted () {
    this.fetchTransactions()
  }
}
</script>
<style></style>
