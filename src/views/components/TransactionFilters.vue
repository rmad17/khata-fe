<template>
  <div  class="container-fluid ml-4">
    <b-row class="">
      <b-col sm="2">
        <label>Start Date</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onFilterChange"  v-model="startDate" type="date"></b-form-input>
      </b-col>
      <b-col class="ml-5" sm="2">
        <label>End Date</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onFilterChange" v-model="endDate"  type="date"></b-form-input>
      </b-col>
    </b-row>
    <b-collapse id="txn-filter-collapse" class="">
      <b-row class="my-1">
        <b-col sm="2">
          <label>Credit/Debit</label>
        </b-col>
        <b-col sm="3">
          <b-form-select @change="onFilterChange" v-model="transactionTypeSelect" :options="transactionTypes"></b-form-select>
        </b-col>
        <b-col sm="2" class="ml-5">
          <label>Bank Name</label>
        </b-col>
        <b-col sm="3">
          <b-form-select @change="onFilterChange"  v-model="bankNameSelect" :options="bankNames"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label> Min Amount</label>
        </b-col>
        <b-col sm="3">
          <b-form-input @change="onFilterChange" v-model="minAmt"></b-form-input>
        </b-col>
        <b-col sm="2" class="ml-5 pl-2">
          <label>Max Amount</label>
        </b-col>
        <b-col sm="3" >
          <b-form-input @change="onFilterChange" v-model="maxAmt"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label>Category</label>
        </b-col>
        <b-col sm="3">
          <b-form-select @change="onFilterChange" v-model="category" :options="categories"></b-form-select>
        </b-col>
      </b-row>
    </b-collapse>
    <b-row>
      <b-col/>
      <b-button class="mr-5" v-b-toggle.txn-filter-collapse variant="outline-primary" @click="onFilterToggle">
        <span v-if="filterOpen"><font-awesome-icon :icon="['fas', 'angle-double-up']"/></span>
        <span v-else><font-awesome-icon :icon="['fas', 'angle-double-down']"/></span>
      </b-button>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
// api
import { httpRequest } from '../../api/index.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

const dayjs = require('dayjs')

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)

export default {
  name: 'transaction-filters',
  data () {
    return {
      filterOpen: false,
      minAmt: 0,
      maxAmt: '',
      category: '',
      tag: '',
      startDate: dayjs().subtract(5, 'month').locale('in').format('YYYY-MM-DD'),
      endDate: dayjs().locale('in').format('YYYY-MM-DD'),
      bankNameSelect: '',
      transactionTypeSelect: '',
      categories: [],
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
  methods: {
    onFilterChange: function () {
      let params = '?'
      if (this.transactionTypeSelect) {
        params += 'transaction_type=' + this.transactionTypeSelect
      }
      if (this.bankNameSelect) {
        params += '&bank_name=' + this.bankNameSelect
      }
      if (this.minAmt) {
        params += '&min_amt=' + this.minAmt
      }
      if (this.maxAmt) {
        params += '&max_amt=' + this.maxAmt
      }
      if (this.category) {
        params += '&category_id=' + this.category
      }
      if (this.tag) {
        params += '&tag=' + this.tag
      }
      if (this.startDate) {
        params += '&start_date=' + this.startDate
      }
      if (this.endDate) {
        params += '&end_date=' + this.endDate
      }
      this.$emit('filterChanged', params)
    },
    getCategories: function () {
      const endpoint = 'statement/category/all/'
      httpRequest(endpoint, 'get', {}, {}, this.addCategories)
    },
    addCategories: function (responseData) {
      this.categories = []
      this.categories.push({ value: '', text: 'All Categories' })
      for (const i in responseData.data) {
        const c = responseData.data[i]
        this.categories.push({ value: c.id, text: c.name })
      }
    },
    onFilterToggle: function () {
      if (this.filterOpen) {
        this.filterOpen = false
      } else {
        this.filterOpen = true
      }
    }
  },
  mounted () {
    this.getCategories()
    this.onFilterChange()
  }
}
</script>
<style>
  .collapsed > #up-arrow,
  .not-collapsed > #down-arrow {
    display: none;
  }
  label{
    padding-left: 5rem;
    margin-top: 0.6rem;
  }
</style>
