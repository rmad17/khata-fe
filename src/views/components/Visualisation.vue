<template>
  <div class="mx-5">
    <div class="mb-4 mt-4 border border-light rounded" v-if="monthlyData.labels.length > 0">
      <bar-chart
        :name="chart1"
        :chart-data="monthlyData"
        :active="active"
        :options="monthlyOptions"/>
    </div>
    <div class="mt-6 border border-light rounded" v-if="categoryData.data.length > 0">
      <pie-chart
        :name="chart2"
        :chart-data="categoryData"
        :active="active"
        :title="chart2Title"
        :extra-options="categoryOptions"/>
    </div>
  </div>
</template>

<script>

import { httpRequest } from '../../api/index.js'

import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'

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
      chart1: 'chart1',
      chart2: 'chart2',
      chart3: 'chart3',
      chart2Title: 'Categorised Expenses',
      baseChartData: {
        labels: [],
        datasets: [
          {
            label: 'Credit',
            backgroundColor: '#34cb65',
            data: [],
            borderWidth: 1.5,
            maxBarThickness: 20,
            categoryPercentage: 0.3,
            borderColor: '#1a995a'
          },
          {
            label: 'Debit',
            backgroundColor: '#fd4e44',
            data: [],
            borderWidth: 1.5,
            maxBarThickness: 20,
            categoryPercentage: 0.3,
            borderColor: '#f00f25'
          }
        ]
      },
      monthlyData: { data: {}, labels: [] },
      monthlyOptions: {},
      categoryData: { data: {}, labels: [] },
      categoryOptions: chartOptions
    }
  },
  props: ['params', 'active'],
  methods: {
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
      const debitData = []
      for (const i in cGraphData) {
        labels.push(cGraphData[i].name)
        debitData.push(cGraphData[i].total_debit)
      }
      this.categoryData.data = debitData
      this.categoryData.labels = labels
      this.categoryOptions = JSON.parse(JSON.stringify(chartOptions))
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
  }
}
</script>
