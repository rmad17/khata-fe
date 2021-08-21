<template>
    <div>
      <div class="container-fluid card shadow" :class="type === 'dark' ? 'bg-default': ''">
        <!-- <b-table class="" striped responsive hover :items="transactionDetails" :fields="fields"></b-table> -->
        <!-- <b-card class="m-2">
          <transaction-filters>
          </transaction-filters>
        </b-card> -->
        <div class="table-responsive" v-for="userFund in userFunds" :key=userFund.id>
          <div class="card-header border-0"
            :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                  {{ userFund.fund.name }}
                </h3>
              </div>
            </div>
          </div>
          <base-table class="table align-items-center table-flush"
                :class="type === 'dark' ? 'table-dark': ''"
                :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                tbody-classes="list"
                :filter="filter"
                :data="userFunds">
            <template slot="columns">
              <th>Transaction Date</th>
              <th>Name</th>
              <th>Type</th>
              <th>Period</th>
              <th>Started On</th>
              <th>Ended On</th>
              <th>SIP Date</th>
              <th>SIP Amount</th>
              <th>Total Amount</th>
            </template>
            <template slot-scope="{row}">
              <td class="budget">
                1
              </td>
              <td>
                {{ row.fund.name }}
              </td>
              <td>
                {{ row.investment_type }}
              </td>
              <td>
                {{ row.investment_period }}
              </td>
              <td>
                {{ row.started_on }}
              </td>
              <td>
                {{ row.ended_on }}
              </td>
              <td>
                {{ row.sip_day }}
              </td>
              <td>
                {{ row.sip_amount }}
              </td>
              <td>
                {{ row.total_amount }}
              </td>
            </template>
          </base-table>
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
