<template>
  <div>
    <canvas :id="name"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js/auto'

Chart.defaults.font.color = '#9aa8b4'
Chart.defaults.font.family = 'Noto Sans'

export default {
  name: 'pie-chart',
  props: ['chartData', 'extraOptions', 'active', 'name'],
  data () {
    return {
      chart: null,
      options: {
        width: 200,
        height: 200,
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
            y: {
              display: false
            },
            x: {
              display: false
            }
          },
          legend: {
            display: false
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
    }
  },
  methods: {
    renderChart: function (chartData, extraOptions) {
      console.log(1)
      const ctx = document.getElementById('' + this.name)
      if (this.chart) {
        this.chart.data = chartData
        this.chart.options = this.options
        this.chart.update()
      } else {
        const chart = new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: this.options
        })
        this.chart = chart
      }
    }
  },
  watch: {
    chartData: function (newData) {
      console.log(2)
      console.log('newData')
      this.chartData = newData
      console.log(this.chartData.datasets)
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
