<template>
  <form @submit.prevent>
    <div class="pl-4 m-4">
      <div v-for="(fund, index) in rows" :key="index">
        <div class="row">
          <div class="col-lg-6 mb-4" v-if="allFunds.length >= 0">
            <cool-select
              @search="searchTextChange"
              :v-model=fund.fundname
              :items="allFundsData"
              item-text="name"
              placeholder="Search by fund name"
              disable-filtering-by-search
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2">
              <base-input
                placeholder="Start Date"
                label= "Start Date"
                input-classes="form-control-alternative"
                name="startDate"
                type="date"
                :v-model=fund.startDate
              />
          </div>
          <div class="col-sm-2">
              <base-input
                placeholder="End Date"
                label= "End Date"
                input-classes="form-control-alternative"
                name="endDate"
                type="date"
                :v-model=fund.endDate
              />
          </div>
          <div class="col-sm-2">
            <b-form-group class="form-control-label" label="Fund Type">
              <b-form-select
                label= "Fund Type"
                input-classes="form-control-alternative"
                :options="fundType"
                name="fundType"
                :v-model=fund.fundType
              />
            </b-form-group>
          </div>
          <div class="col-sm-2">
            <b-form-group class="form-control-label" label="Fund Period">
              <b-form-select
                label= "Fund Period"
                input-classes="form-control-alternative"
                name="fundPeriod"
                :options="fundPeriod"
                :v-model=fund.fundPeriod
              />
            </b-form-group>
          </div>
          <div class="col-sm-2">
              <base-input
                placeholder="Amount"
                label="Amount"
                input-classes="form-control-alternative"
                name="amount"
                type="number"
                :v-model=fund.amount
              />
          </div>
          <div class="col-m-1 mx-3 mt-4 pt-2" v-if="index == rows.length - 1">
              <b-button class="shadow px-3" pill v-b-tooltip.hover title="Add new fund" variant="outline-primary"
                @click="addRow">
                <font-awesome-icon size="lg" :icon="['fas', 'plus-circle']"></font-awesome-icon>
              </b-button>
          </div>
          <div class="col-m-1 mt-4 pt-2" v-if="index == rows.length - 1 && index > 0">
              <b-button class="shadow px-3" pill v-b-tooltip.hover title="Remove fund" variant="outline-danger"
                @click="removeRow">
                <font-awesome-icon size="lg" :icon="['fas', 'times-circle']"></font-awesome-icon>
              </b-button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { httpRequest } from '../api/index.js'

import { CoolSelect } from 'vue-cool-select'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faTimesCircle)

export default {
  name: 'investments',
  components: { CoolSelect },
  methods: {
    addRow: function () {
      this.rows.push({ fundType: null, fundPeriod: null })
    },
    removeRow: function () {
      this.rows.pop()
    },
    searchTextChange: async function (searchText) {
      if (searchText.length > 2) {
        console.log(searchText + ':  Search Text')
        this.allFunds(searchText)
      }
    },
    allFunds: function (searchText) {
      const endpoint = 'investments/fund/all/?search_text=' + searchText
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.updateFundsList)
    },
    updateFundsList: function (responseData) {
      this.allFundsData = responseData.data
    }
  },
  data () {
    return {
      rows: [{ fundType: null, fundPeriod: null }],
      fundPeriod: [
        { value: null, text: 'Fund Period' },
        { value: 'monthly', text: 'Monthly' },
        { value: 'quarterly', text: 'Quarterly' }
      ],
      fundType: [
        { value: null, text: 'Fund Type' },
        { value: 'lumpsum', text: 'Lumpsum' },
        { value: 'sip', text: 'SIP' }
      ],
      search_text: null,
      selected: '',
      allFundsData: []
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
