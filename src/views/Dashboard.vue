<template>
  <div>
    <!-- Card stats -->
    <div class="row mx-2 mt-2">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Transactions"
            type="gradient-purple"
            rupee="true"
            :sub-title=dashboardInfoData.total_transaction_value
            icon="receipt"
            class="mb-4 mb-xl-0 border rounded">
              <template slot="footer">
                <span class="text-nowrap text-gray font-weight-400">
                  {{ dashboardInfoData.total_transactions }} &nbsp; Transactions since last month
                </span>
              </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total Credit"
                      type="gradient-green"
                      rupee="true"
                      :sub-title=dashboardInfoData.total_credit
                      icon="credit-card"
                      class="mb-4 mb-xl-0 border rounded">
              <template slot="footer">
                <span class="text-nowrap text-gray font-weight-400">
                  {{ dashboardInfoData.credit_txns }} &nbsp; Transactions since last month
                </span>
              </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total Debit"
                      type="gradient-red"
                      rupee="true"
                      :sub-title=dashboardInfoData.total_debit
                      icon="coins"
                      class="mb-4 mb-xl-0 border rounded">
              <template slot="footer">
                <span class="text-nowrap text-gray font-weight-400">
                  {{ dashboardInfoData.debit_txns }} &nbsp; Transactions since last month
                </span>
              </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
            <stats-card title="Balance"
                        type="gradient-info"
                        rupee="true"
                        :sub-title=dashboardInfoData.balance
                        icon="wallet"
                        class="mb-4 mb-xl-0 border rounded">
              <template slot="footer">
                  <span class="text-nowrap text-gray font-weight-400"> Cumulative Balance</span>
              </template>
            </stats-card>
        </div>
    </div>
    <div class="container-fluid mt-5">
      <b-card-group deck>
        <b-card class="text-left ml-4 mr-3 px-2 border rounded shadow-sm"
          header="Upload bank statement to update transactions"
          header-text-variant="primary"
          align="left">
          <b-card-text>
            It is recommended to add tags and categories before uploading statement to autocategorise them.
            <router-link :to="{ name: 'category'}">
              <b-button variant="outline-primary" size="sm" class="mx-2"> Add Category </b-button>
            </router-link>
          </b-card-text>
          <b-form class="" id="statement-upload" @submit="onSubmit" @reset="onReset">
            <b-form-group>
              <b-form-file
                accept=".csv, .xls, .xlsx"
                variant="primary"
                form="statement-upload"
                v-model="file"
                placeholder="Choose a .csv, xls or .xlsx bank statement"
                drop-placeholder="Drop file here..." required>
              </b-form-file>
            </b-form-group>
            <b-form-group>
              <b-form-select required size="2" v-model="selected" :options="options.possible_banks"></b-form-select>
            </b-form-group>
              <b-button :disabled="disableSubmit" type="submit" variant="success">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
        <b-card class="ml-3 mr-4 p-2"
          no-body
          header="Updates">
          <b-list-group flush>
            <b-list-group-item class="border-0">
              <slot><font-awesome-icon :icon="['fas', 'check']" color="green" class="mx-2"/></slot>
              Updated in last 30 days. Last updated at {{ updates.last_update }}.
            </b-list-group-item>
            <b-list-group-item class="border-0">
              <slot><font-awesome-icon :icon="['fas', 'check']" color="green" class="mx-2"/></slot>
              Created at least 3 categories.
            </b-list-group-item>
            <b-list-group-item class="border-0">
              <slot><font-awesome-icon :icon="['fas', 'times']" color="red" class="mx-2"/></slot>
              &nbsp;&nbsp; Verified mobile number.
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>

// api
import { httpRequest } from '../api/index.js'
// Vuex
import { mapActions, mapState } from 'vuex'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes)

export default {
  name: 'dashboard',
  components: {},
  data () {
    return {
      disableSubmit: false,
      file: null,
      selected: null,
      options: {
        possible_banks: [
          { value: null, text: 'Please select a bank name' },
          { value: 'hdfc', text: 'HDFC Bank' },
          { value: 'icici', text: 'ICICI Bank' },
          { value: 'kotak', text: 'Kotak Mahindra Bank' }
        ]
      },
      updates: []
    }
  },
  computed: {
    ...mapState({
      profileData: state => state.profile,
      dashboardInfoData: state => state.dashboardInfo
    })
  },
  methods: {
    ...mapActions([
      'updateDashboardInfo',
      'updateProfile'
    ]),
    onReset: function () {
      this.file = null
      this.selected = null
    },
    onSubmit: function () {
      this.disableSubmit = true
      // const endpoint = 'statement/upload/'
      const formData = new FormData()
      formData.append('bank_name', this.selected)
      formData.append('statement', this.file)
      // const headers = { 'Content-Type': 'multipart/form-data' }
      this.onReset()
      // httpRequest(endpoint, 'post', formData, headers, this.postSubmit)
    },
    postSubmit: function (responseData) {
      this.fetchTransactions()
      this.disableSubmit = false
    },
    getDashboardInfo: function () {
      var endpoint = 'statement/dashboard/'
      httpRequest(endpoint, 'get', {}, {}, this.storeDashboardInfo)
    },
    storeDashboardInfo: function (responseData) {
      this.$store.dispatch('updateDashboardInfo', responseData.data)
    }
  },
  mounted () {
    this.getDashboardInfo()
  }
}
</script>
<style></style>
