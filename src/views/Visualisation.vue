<template>
  <div class="container">
    <line-chart
      :chart-data="chartData"
      :options="options"/>
  </div>
</template>
<script>
// import { Line } from 'vue-chartjs'
import LineChart from '@/components/Charts/LineChart'
// Charts
import * as chartConfigs from '@/components/Charts/config'

export default {
  // extends: Line,
  name: 'visualisation',
  components: { LineChart },
  // props: ['transactionDetails', 'categories'],
  // data () {
  //   return {
  //     options: {},
  //     chartdata: {}
  //   }
  // },
  data () {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ff87979',
            data: [40, 20, 35, 42, 17, 27]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      extraOptions: chartConfigs.blueChartOptions
    }
  },
  methods: {
    monthly_credit_debit: function () {
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
