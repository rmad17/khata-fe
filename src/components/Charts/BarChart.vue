
<template>
  <div>
    <canvas :id="name" width="500" height="200"></canvas>
  </div>
</template>
<script>

import Chart from 'chart.js/auto'

Chart.defaults.font.color = '#9aa8b4'
Chart.defaults.font.family = 'Noto Sans'

export default {
  name: 'bar-chart',
  props: ['chartData', 'options', 'active', 'name'],
  data () {
    return {
      chart: null
    }
  },
  methods: {
    renderChart: function (chartData, options) {
      const ctx = document.getElementById('' + this.name)
      if (this.chart) {
        this.chart.data = chartData
        this.chart.options = options
        this.chart.update()
      } else {
        const chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: options
        })
        this.chart = chart
      }
    }
  },
  watch: {
    chartData: function (newData) {
      this.chartData = newData
      this.renderChart(this.chartData, this.options)
    },
    active: function (newData) {
      if (newData === true) {
        this.renderChart(this.chartData, this.options)
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
