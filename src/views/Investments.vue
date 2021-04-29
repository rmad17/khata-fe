<template>
  <form @submit.prevent>
    <div class="pl-4 m-4">
      <div v-for="(fund, index) in rows" :key="index">
        <div class="row">
          <div class="col-lg-6">
              <base-input
                placeholder="Fund"
                input-classes="form-control-alternative"
                name="fundname"
                :v-model=fund.fundname
              />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2">
              <base-input
                placeholder="Start Date"
                input-classes="form-control-alternative"
                name="startDate"
                type="date"
                :v-model=fund.startDate
              />
          </div>
          <div class="col-sm-2">
              <base-input
                placeholder="End Date"
                input-classes="form-control-alternative"
                name="endDate"
                type="date"
                :v-model=fund.endDate
              />
          </div>
          <div class="col-sm-2">
              <b-form-select
                placeholder="Type"
                input-classes="form-control-alternative"
                :options="fundType"
                name="fundType"
                :v-model=fund.fundType
              />
          </div>
          <div class="col-sm-2">
              <b-form-select
                placeholder="Period"
                input-classes="form-control-alternative"
                name="fundPeriod"
                :options="fundPeriod"
                :v-model=fund.fundPeriod
              />
          </div>
          <div class="col-sm-2">
              <base-input
                placeholder="Amount"
                input-classes="form-control-alternative"
                name="amount"
                type="number"
                :v-model=fund.amount
              />
          </div>
          <div class="col-m-1 mx-3" v-if="index == rows.length - 1">
              <b-button class="shadow px-3" pill v-b-tooltip.hover title="Add new fund" variant="outline-primary"
                @click="addRow">
                <font-awesome-icon size="lg" :icon="['fas', 'plus-circle']"></font-awesome-icon>
              </b-button>
          </div>
          <div class="col-m-1" v-if="index == rows.length - 1 && index > 0">
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
// import { httpRequest } from '../api/index.js'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faTimesCircle)

export default {
  name: 'investments',
  methods: {
    addRow: function () {
      this.rows.push({ fundType: null, fundPeriod: null })
    },
    removeRow: function () {
      this.rows.pop()
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
      ]
    }
  }
}
</script>
<style>
</style>
