<template>
  <div>
    <bar-chart
      :chart-data="monthlyData"
      :options="options"/>
    <horizontal-bar-chart
      :chart-data="categoryData"
      :options="options"/>
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
      }
    }]
  },
  legend: {
    display: true,
    labels: {
      fontFamily: 'sans-serif',
      fontSize: 18
    }
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
            categoryPercentage: 0.4,
            pointBorderColor: 'white',
            borderColor: 'transparent'
          },
          {
            label: 'Debit',
            backgroundColor: '#d0465e',
            data: [30, 30, 55, 22, 57, 7],
            borderWidth: 1,
            categoryPercentage: 0.4,
            pointBorderColor: 'white',
            borderColor: 'transparent'
          }
        ]
      },
      options: chartOptions
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
      console.log('X')
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
      this.options.title.text = 'Monthly Credit/Debit'
    },
    categoryGraphData: function (responseData) {
      console.log('A')
      const cGraphData = responseData.data
      console.log(responseData)
      const labels = []
      for (const i in cGraphData) {
        labels.push(i.name)
        console.log('Label' + i.name)
      }
      console.log('B')
      const creditData = [1, 2, 3]
      const debitData = [3, 2, 1]
      console.log('C')
      this.categoryData = JSON.parse(JSON.stringify(this.chartData))
      this.categoryData.datasets[0].data = creditData
      this.categoryData.datasets[1].data = debitData
      this.categoryData.labels = labels
      console.log('Category Data')
      this.options.title.text = 'Category Credit/Debit'
      console.log(this.options.title)
      console.log(this.categoryData)
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
