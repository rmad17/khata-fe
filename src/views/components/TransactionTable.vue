<template>
  <div class="mt-4 container-fluid shadow">
    <div class="table-responsive" v-for="transactionDetail in transactionDetails" :key=transactionDetail.name>
      <div class="card-header border-0">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0">
              {{ transactionDetail.name | bankNames }}
            </h3>
          </div>
        </div>
      </div>
      <base-table class="table align-items-center table-flush"
        :thead-classes="'thead-light'"
        tbody-classes="list"
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
</template>
<script>
export default {
  name: 'transaction-table',
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
      bankNames: [
        { value: '', text: 'All Banks' },
        { value: 'kotak', text: 'Kotak Mahindra Bank' },
        { value: 'hdfc', text: 'HDFC Bank' }
      ],
      transactionTypes: [
        { value: '', text: 'Credit/Debit' },
        { value: 1, text: 'Credit' },
        { value: 2, text: 'Debit' }
      ]
    }
  },
  props: ['transaction-details'],
  methods: {
  },
  mounted () {
  }
}
</script>
