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
  props: ['chartData', 'extraOptions', 'active', 'name', 'title'],
  data () {
    return {
      colors: ['#0074d9', '#ff4136', '#2ecc40', '#ff851b', '#7fdbff', '#b10dc9', '#ffdc00', '#001f3f', '#39cccc', '#01ff70', '#85144b', '#f012be', '#3d9970', '#111111', '#aaaaaa'],
      bgColors: [],
      chart: null,
      options: {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            font: {
              size: 18,
              weight: 'normal'
            },
            padding: 20,
            display: true,
            text: this.title
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
            display: true
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
    datasetColors: function (sizee) {
      const colors = []
      for (let i = 0; i < sizee; i++) {
        colors.push('#' + Math.floor(Math.random() * 16777215).toString(16))
      }
      return colors
    },
    renderChart: function (chartData, extraOptions) {
      if (chartData.data && chartData.data.length > this.colors.length) {
        this.bgColors = this.colors.concat(this.datasetColors(chartData.data.length - this.colors.length))
      } else {
        this.bgColors = this.colors.slice(0, chartData.data.length)
      }
      const baseChartData = {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          backgroundColor: this.bgColors,
          hoverOffset: 4
        }]
      }
      console.log(JSON.stringify(baseChartData))
      const ctx = document.getElementById('' + this.name)
      if (this.chart != null) {
        this.chart.destroy()
      }
      const chart = new Chart(ctx, {
        type: 'pie',
        data: baseChartData,
        options: this.options
      })
      this.chart = chart
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
