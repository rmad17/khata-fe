<template>
  <div class="container-fluid">
    <div class="m-4">
        <existing-funds>
        </existing-funds>
      </div>
    <b-modal id="add-fund-modal" size="lg"
      hide-header
      hide-footer>
      <b-form  @submit="onSubmit" @reset="onReset" >
        <div class="pl-4 my-1">
          <div class="row">
            <div class="col-lg-10 mb-3 pt-1" v-if="allFunds.length >= 0">
              <cool-select
                @search="searchTextChange"
                @select="fundSelected"
                :items="allFundsData"
                item-text="scheme_name"
                placeholder="Type fund name to search"
                disable-filtering-by-search
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
                <b-form-group class="form-control-label" label="Start Date *">
                  <b-form-input v-model="form.started_on" close-button placeholder="Start Date" type="date" required></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-2">
                <b-form-group class="form-control-label" label="End Date">
                  <b-form-input v-model="form.ended_on" close-button placeholder="End Date" type="date"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-2">
              <b-form-group class="form-control-label" label="Fund Type *">
                <b-form-select
                  label= "Fund Type"
                  v-model=form.investment_type
                  :options="fundType"
                  required
                />
              </b-form-group>
            </div>
            <div class="col-sm-2">
              <b-form-group class="form-control-label" label="Fund Period">
                <b-form-select
                  label= "Fund Period"
                  v-model=form.investment_period
                  :options="fundPeriod"
                />
              </b-form-group>
            </div>
            <div class="col-sm-2">
              <b-form-group class="form-control-label" label="Amount *">
                <b-form-input v-model="form.amount" placeholder="Amount" type="number" required></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row mt-1 float-right mx-2 px-2">
            <b-button type="submit" variant="success" class="text-right">
              Save
            </b-button>
            <b-button type="reset" variant="danger">
              Reset
            </b-button>
          </div>
        </div>
      </b-form>
    </b-modal>
    <b-button class="ml-4" v-b-modal.add-fund-modal variant="primary">Add Fund</b-button>
  </div>
</template>
<script>
import { httpRequest } from '../api/index.js'

import { CoolSelect } from 'vue-cool-select'

import ExistingFunds from './components/investments/ExistingFunds.vue'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faTimesCircle)

export default {
  name: 'investments',
  components: { CoolSelect, ExistingFunds },
  methods: {
    searchTextChange: async function (searchText) {
      if (searchText.length > 2) {
        console.log(searchText + ':  Search Text')
        this.allFunds(searchText)
      }
    },
    fundSelected: function (object) {
      console.log(object)
      this.form.fund_id = object.id
    },
    allFunds: function (searchText) {
      const endpoint = 'investments/fund/all/?search_text=' + searchText
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.updateFundsList)
    },
    updateFundsList: function (responseData) {
      this.allFundsData = responseData.data
    },
    onSubmit: function (event) {
      event.preventDefault()
      const endpoint = 'investments/userfund/add/'
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'post', JSON.stringify(this.form), headers, null)
    },
    onReset: function (event) {
      event.preventDefault()
    }
  },
  data () {
    return {
      search_text: null,
      form: {
        fund_id: '',
        started_on: null,
        ended_on: null,
        investment_type: 0,
        investment_period: 0,
        amount: null
      },
      allFundsData: [],
      fundPeriod: [
        { value: 0, text: 'Fund Period' },
        { value: 1, text: 'Monthly' },
        { value: 2, text: 'Quarterly' }
      ],
      fundType: [
        { value: 0, text: 'Fund Type' },
        { value: 1, text: 'Lumpsum' },
        { value: 2, text: 'SIP' }
      ]
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
