<!--
<template>
  <div class="container">
    <line-chart
      :height="350"
      :chart-data="chartData"
      :options="options"/>
  </div>
</template>
-->
<script>

import { httpRequest } from '../api/index.js'

// Charts
import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'

Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#9aa8b4'

export default {
  extends: Bar,
  name: 'visualisation',
  data () {
    return {
      urlParams: this.params,
      graphData: {},
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
    }
  },
  props: ['params'],
  methods: {
    monthlyCreditDebit: function () {
      console.log('Monthly Cr Dr')
      const endpoint = 'statement/reports/graph/periodic/' + this.urlParams
      const headers = { 'Content-Type': 'multipart/form-data' }
      httpRequest(endpoint, 'get', null, headers, this.constructGraphData)
    },
    constructGraphData: function (responseData) {
      const graphData = responseData.data
      var creditData = []
      var debitData = []
      for (let i = 0; i < graphData.ordered_months.length; i++) {
        const mon = graphData.ordered_months[i]
        creditData.push(graphData[mon].total_credit)
        debitData.push(graphData[mon].total_debit)
      }
      this.chartData.labels = graphData.ordered_months
      this.chartData.datasets[0].data = creditData
      this.chartData.datasets[1].data = debitData
      this.renderChart(this.chartData, this.options)
    }
  },
  watch: {
    params: function (newParams) {
      this.urlParams = newParams
      this.monthlyCreditDebit()
    }
  },
  mounted () {
    this.monthlyCreditDebit()
  }
}
</script>
