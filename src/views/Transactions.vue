<template>
    <div>
      <div class="container-fluid card shadow" :class="type === 'dark' ? 'bg-default': ''">
        <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
        <b-card class="m-2">
          <transaction-filters>
          </transaction-filters>
        </b-card>
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

import TransactionFilters from './components/TransactionFilters'

export default {
  name: 'transactions',
  components: {
    TransactionFilters
  },
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
