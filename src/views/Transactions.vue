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
      disableSubmit: false,
      file: null,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'kotak', text: 'Kotak Mahindra Bank' },
        { value: 'hdfc', text: 'HDFC Bank' }
      ],
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
      this.transactionDetails = responseData.data
    }
  },
  mounted () {
    this.fetchTransactions()
  }
}
</script>
<style></style>
