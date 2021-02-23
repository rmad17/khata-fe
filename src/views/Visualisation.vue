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
      transactionsData: this.transactions,
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
  props: {
    transactions: {
      type: Array,
      default: () => [],
      description: 'Transactions Data'
    }
  },
  methods: {
    monthly_credit_debit: function () {
      console.log('Hello')
      console.log(this.transactions)
    }
  },
  watch: {
    transactions: function () {
      this.transactionsData = this.transactions
      this.monthly_credit_debit()
    }
  },
  mounted () {
    this.monthly_credit_debit()
    this.renderChart(this.chartData, this.options)
  }
}
</script>
