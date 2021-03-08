<template>
  <div>
    <div class="mb-2">
      <bar-chart
        :chart-data="monthlyData"
        :options="monthlyOptions"/>
    </div>
    <div class="mt-2">
      <horizontal-bar-chart
        :chart-data="categoryData"
        :options="categoryOptions"/>
    </div>
  </div>
</template>

<script>

import { httpRequest } from '../api/index.js'

import BarChart from '@/components/Charts/BarChart'
import HorizontalBarChart from '@/components/Charts/HorizontalBarChart'

var chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica Neue',
    fontColor: '#5e72e4',
    padding: 20,
    display: true,
    text: ''
  },
  scales: {
    yAxes: [{
      gridLines: {
        display: true
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      },
      categoryPercentage: 0.2,
      barPercentage: 0.2
    }]
  },
  legend: {
    display: true,
    labels: {
      fontFamily: 'Helvetica Neue',
      fontSize: 18
    },
    align: 'end'
  },
  layout: {
    padding: {
      left: 50,
      right: 50,
      top: 0,
      bottom: 0
    }
  }
}

export default {
  name: 'visualisation',
  components: {
    BarChart,
    HorizontalBarChart
  },
  data () {
    return {
      urlParams: this.params,
      monthlyData: {},
      categoryData: {},
      chartData: {
        datasets: [
          {
            label: 'Credit',
            backgroundColor: '#5ac18e',
            data: [40, 20, 35, 42, 17, 27],
            borderWidth: 1,
            maxBarThickness: 15,
            categoryPercentage: 0.4,
            pointBorderColor: 'white',
            borderColor: 'transparent'
          },
          {
            label: 'Debit',
            backgroundColor: '#d0465e',
            data: [30, 30, 55, 22, 57, 7],
            borderWidth: 1,
            maxBarThickness: 15,
            categoryPercentage: 0.4,
            pointBorderColor: 'white',
            borderColor: 'transparent'
          }
        ]
      },
      monthlyOptions: {},
      categoryOptions: {}
    }
  },
  props: ['params'],
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
      this.monthlyData = JSON.parse(JSON.stringify(this.chartData))
      this.monthlyData.labels = graphData.ordered_months
      this.monthlyData.datasets[0].data = creditData
      this.monthlyData.datasets[1].data = debitData
      this.monthlyOptions = JSON.parse(JSON.stringify(chartOptions))
      this.monthlyOptions.title.text = 'Monthly Credit/Debit'
    },
    categoryGraphData: function (responseData) {
      const cGraphData = responseData.data
      const labels = []
      for (const i in cGraphData) {
        labels.push(cGraphData[i].name)
      }
      const creditData = [1, 2, 3]
      const debitData = [3, 2, 1]
      this.categoryData = JSON.parse(JSON.stringify(this.chartData))
      this.categoryData.datasets[0].data = creditData
      this.categoryData.datasets[1].data = debitData
      this.categoryData.labels = labels
      this.options = JSON.parse(JSON.stringify(chartOptions))
      this.categoryOptions.title.text = 'Category Credit/Debit'
      this.categoryOptions.scales.xAxes.gridLines.display = true
      this.categoryOptions.scales.yAxes.gridLines.display = false
    }
  },
  watch: {
    params: function (newParams) {
      this.urlParams = newParams
      this.monthlyCreditDebit()
      this.categorisedCreditDebit()
    }
  },
  mounted () {
    this.monthlyCreditDebit()
    this.categorisedCreditDebit()
  }
}
</script>
