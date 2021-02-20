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
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Credit',
            backgroundColor: '#5ac18e',
            data: [40, 20, 35, 42, 17, 27],
            borderWidth: 1,
            // barThickness: 20,
            // barPercentage: 0.8,
            categoryPercentage: 0.4,
            pointBorderColor: 'white',
            borderColor: 'transparent'
          },
          {
            label: 'Debit',
            backgroundColor: '#d0465e',
            data: [30, 30, 55, 22, 57, 7],
            borderWidth: 1,
            // barThickness: 20,
            // barPercentage: 0.8,
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
              display: true
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
  methods: {
    monthly_credit_debit: function () {}
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
