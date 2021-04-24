<template>
  <div class="mx-5">
    <div class="mb-4 mt-4 border border-light rounded">
      <bar-chart
        :name="chart1"
        :chart-data="monthlyData"
        :active="active"
        :options="monthlyOptions"/>
    </div>
    <div class="mt-6 border border-light rounded">
      <pie-chart
        :name="chart2"
        :chart-data="categoryData"
        :active="active"
        :extra-options="categoryOptions"/>
    </div>
  </div>
</template>

<script>

import { httpRequest } from '../../api/index.js'

import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'

// Vuex
import { mapActions, mapState } from 'vuex'

var chartOptions = {
  responsive: true,
  aspectRatio: 3,
  plugins: {
    title: {
      font: {
        size: 18,
        weight: 'normal'
      },
      padding: 20,
      display: true,
      text: ''
    },
    scales: {
      y: [{
        gridLines: {
          display: true
        },
        display: true
      }],
      x: [{
        gridLines: {
          display: false
        },
        display: true,
        font: {
          size: 12
        }
      }]
    },
    legend: {
      display: true,
      align: 'end'
    }
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    }
  }
}

export default {
  name: 'visualisation',
  components: {
    BarChart,
    PieChart
  },
  data () {
    return {
      urlParams: this.params,
      monthlyData: {},
      categoryData: this.$store.state.chartData.categoryData,
      chart1: 'chart1',
      chart2: 'chart2',
      chart3: 'chart3',
      baseChartData: {
        datasets: [
          {
            label: 'Credit',
            backgroundColor: '#34cb65',
            data: [40, 20, 35, 42, 17, 27],
            borderWidth: 1.5,
            maxBarThickness: 20,
            categoryPercentage: 0.3,
            borderColor: '#1a995a'
          },
          {
            label: 'Debit',
            backgroundColor: '#fd4e44',
            data: [30, 30, 55, 22, 57, 7],
            borderWidth: 1.5,
            maxBarThickness: 20,
            categoryPercentage: 0.3,
            borderColor: '#f00f25'
          }
        ]
      },
      monthlyOptions: {},
      categoryOptions: chartOptions
    }
  },
  props: ['params', 'active'],
  computed: {
    ...mapState({
      chartData: state => state.chartData
    })
  },
  methods: {
    ...mapActions([
      'updateChartData'
    ]),
    monthlyCreditDebit: function () {
      const endpoint = 'statement/reports/graph/periodic/' + this.urlParams
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.monthlyGraphData)
    },
    categorisedCreditDebit: function () {
      const endpoint = 'statement/reports/graph/category/' + this.urlParams
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.categoryGraphData)
    },
    monthlyGraphData: function (responseData) {
      const graphData = responseData.data
      var creditData = []
      var debitData = []
      for (let i = 0; i < graphData.ordered_months.length; i++) {
        const mon = graphData.ordered_months[i]
        creditData.push(graphData[mon].total_credit)
        debitData.push(graphData[mon].total_debit)
      }
      this.monthlyData = JSON.parse(JSON.stringify(this.baseChartData))
      this.monthlyData.labels = graphData.ordered_months
      this.monthlyData.datasets[0].data = creditData
      this.monthlyData.datasets[1].data = debitData
      this.monthlyOptions = JSON.parse(JSON.stringify(chartOptions))
      this.monthlyOptions.plugins.title.text = 'Monthly Credit/Debit'
    },
    categoryGraphData: function (responseData) {
      const cGraphData = responseData.data
      const labels = []
      for (const i in cGraphData) {
        labels.push(cGraphData[i].name)
      }
      const debitData = [3, 2, 1]
      this.categoryData = JSON.parse(JSON.stringify(this.baseChartData))
      delete this.categoryData.datasets[1]
      this.categoryData.datasets[0].data = debitData
      this.categoryData.labels = labels
      this.categoryData.hoverOffset = 4
      this.categoryOptions = JSON.parse(JSON.stringify(chartOptions))
      this.categoryOptions.plugins.title.text = 'Category Credit/Debit'
    }
  },
  watch: {
    params: function (newParams) {
      this.urlParams = newParams
      this.monthlyCreditDebit()
      this.categorisedCreditDebit()
    },
    active: function (newData) {
      this.active = newData
    }
  },
  mounted () {
    // this.monthlyCreditDebit()
    // this.categorisedCreditDebit()
  }
}
</script>
