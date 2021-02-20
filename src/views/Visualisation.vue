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
import { Bar } from 'vue-chartjs'
// import LineChart from '@/components/Charts/LineChart'
// Charts
// import * as chartConfigs from '@/components/Charts/config'

export default {
  extends: Bar,
  name: 'visualisation',
  // components: { LineChart },
  /// props: [],
  // data () {
  //   return {
  //     options: {},
  //     chartdata: {}
  //   }
  // },
  data () {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Credit',
            backgroundColor: '#6563d6',
            data: [40, 20, 35, 42, 17, 27],
            borderWidth: 1
          },
          {
            label: 'Debit',
            backgroundColor: '#2685c4',
            data: [30, 30, 55, 22, 57, 7],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
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
