<template>
  <div  class="container-fluid">
    <b-row class="my-1">
      <b-col sm="2">
        <label>Transaction Type</label>
      </b-col>
      <b-col sm="3">
        <b-form-select @change="onSubmit" v-model="transactionTypeSelect" :options="transactionTypes"></b-form-select>
      </b-col>
      <b-col sm="2">
        <label>Bank Name</label>
      </b-col>
      <b-col sm="3">
        <b-form-select @change="onSubmit"  v-model="bankNameSelect" :options="bankNames"></b-form-select>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label> Min Amount</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onSubmit" v-model="minAmt" :type="number"></b-form-input>
      </b-col>
      <b-col sm="2">
        <label>Max Amount</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onSubmit" v-model="maxAmt"  :type="number"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label>Start Date</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onSubmit"  v-model="startDate" type="date"></b-form-input>
      </b-col>
      <b-col sm="2">
        <label>End Date</label>
      </b-col>
      <b-col sm="3">
        <b-form-input @change="onSubmit" v-model="endDate"  type="date"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label>Category</label>
      </b-col>
      <b-col sm="3">
        <b-form-select @change="onSubmit" v-model="category" :options="categories"></b-form-select>
      </b-col>
      <!-- <b-col sm="2">
        <label>Tag</label>
      </b-col>
      <b-col sm="3">
        <b-form-select @change="onSubmit"  v-model="tag" :options="categories.tags"></b-form-select>
      </b-col> -->
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'transaction-filters',
  data () {
    return {}
  },
  props: ['params'],
  methods: {
  },
  mounted () {
  }
}
</script>
