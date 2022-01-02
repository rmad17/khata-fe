<template>
    <div>
      <div class="container-fluid shadow" :class="type === 'dark' ? 'bg-default': ''">
        <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
        <!-- <b-card class="m-2">
          <transaction-filters>
          </transaction-filters>
        </b-card> -->
        <div class="table-responsive" v-for="userFund in userFunds" :key=userFund.id>
          <b-card class="my-2" header-bg-variant="purple" header-text-variant="white" border-variant="success" :header="userFund.fund.scheme_name">
            <b-card-text>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
</template>
<script>

// api
import { httpRequest } from '../../../api/index.js'

// import TransactionFilters from './components/TransactionFilters'

export default {
  name: 'existing-funds',
  //   components: {
  //     TransactionFilters
  //   },
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
      userFunds: [],
      type: 'light'
    }
  },
  computed: {
  },
  methods: {
    getUserFunds: function () {
      const endpoint = 'investments/userfund/all/'
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.updateUserFunds)
    },
    updateUserFunds: function (responseData) {
      this.userFunds = responseData.data
    }
  },
  mounted () {
    this.getUserFunds()
  }
}
</script>
<style></style>
