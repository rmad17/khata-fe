<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'visualisation',
  props: ['transactionDetails', 'categories'],
  data () {
    return {
      options: {},
      chartdata: {}
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
