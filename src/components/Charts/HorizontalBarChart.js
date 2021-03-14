
import { HorizontalBar } from 'vue-chartjs'
import Chart from 'chart.js'

Chart.defaults.global.defaultFontSize = 14
Chart.defaults.global.defaultFontColor = '#9aa8b4'

export default {
  name: 'horizontal-bar-chart',
  extends: HorizontalBar,
  props: ['chartData', 'options'],
  data () {
    return {
    }
  },
  methods: {
  },
  watch: {
    chartData: function (newData) {
      this.chartData = newData
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
