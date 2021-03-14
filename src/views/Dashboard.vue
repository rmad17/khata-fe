<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                  <router-link to="/transactions">
                    <stats-card
                      title="Transactions"
                      type="gradient-purple"
                      :sub-title=dashboardInfoData.total_transactions
                      icon="ni ni-chart-bar-32"
                      class="mb-4 mb-xl-0">
                        <template slot="footer">
                            <span class="text-success mr-2 font-weight-400"><i class="fa fa-arrow-up"></i>48</span>
                            <span class="text-nowrap text-gray font-weight-400">Transactions since last month</span>
                        </template>
                    </stats-card>
                  </router-link>
                </div>
                <div class="col-xl-3 col-lg-6">
                  <router-link to="/transactions">
                    <stats-card title="Total Credit"
                                type="gradient-green"
                                rupee="true"
                                :sub-title=dashboardInfoData.total_credit
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2 font-weight-400"><i class="fa fa-arrow-up"></i>31</span>
                            <span class="text-nowrap text-gray font-weight-400">Transactions since last month</span>
                        </template>
                    </stats-card>
                  </router-link>
                </div>
                <div class="col-xl-3 col-lg-6">
                  <router-link to="/transactions">
                    <stats-card title="Total Debit"
                                type="gradient-red"
                                rupee="true"
                                :sub-title=dashboardInfoData.total_debit
                                icon="ni ni-credit-card"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2 font-weight-400"><i class="fa fa-arrow-down"></i> 17 </span>
                            <span class="text-nowrap text-gray font-weight-400">Transactions since last month</span>
                        </template>
                    </stats-card>
                  </router-link>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Balance"
                                type="gradient-info"
                                :sub-title=dashboardInfoData.balance
                                icon="ni ni-bank"
                                class="mb-4 mb-xl-0"
                    >
                      <template slot="footer">
                          <span class="text-success mr-2 font-weight-400"><i class="fa fa-arrow-up"></i> 54.8%</span>
                          <span class="text-nowrap text-gray font-weight-400">Since last month</span>
                      </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Month</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">Week</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>

// api
import { httpRequest } from '../api/index.js'
// Vuex
import { mapActions, mapState } from 'vuex'
// Charts
import * as chartConfigs from '@/components/Charts/config'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable'
import PageVisitsTable from './Dashboard/PageVisitsTable'

export default {
  name: 'dashboard',
  components: {
    LineChart,
    BarChart,
    PageVisitsTable,
    SocialTrafficTable
  },
  data () {
    return {
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
          [10, 32, 15, 35, 20, 40, 25, 30, 90],
          [10, 22, 15, 35, 10, 30, 15, 40, 70]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: []
        },
        extraOptions: chartConfigs.blueChartOptions
      },
      redBarChart: {
        chartData: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 29]
          },
          {
            label: 'Profits',
            data: [20, 10, 13, 12, 17, 19]
          }]
        }
      }
    }
  },
  computed: {
    ...mapState({
      profileData: state => state.profile,
      dashboardInfoData: state => state.dashboardInfo
    })
  },
  methods: {
    initBigChart (index) {
      const chartData = {
        datasets: [
          {
            backgroundColor: '#f35284',
            label: 'Performance',
            data: this.bigLineChart.allData[index]
          },
          {
            backgroundColor: '#ff6384',
            label: 'Profits',
            data: this.bigLineChart.allData[3]
          }
        ],
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
      this.bigLineChart.chartData = chartData
      this.bigLineChart.activeIndex = index
    },
    ...mapActions([
      'updateDashboardInfo',
      'updateProfile'
    ]),
    getDashboardInfo: function () {
      var endpoint = 'statement/dashboard/'
      httpRequest(endpoint, 'get', {}, {}, this.storeDashboardInfo)
    },
    storeDashboardInfo: function (responseData) {
      this.$store.dispatch('updateDashboardInfo', responseData.data)
    }
  },
  mounted () {
    this.initBigChart(0)
    this.getDashboardInfo()
  }
}
</script>
<style></style>
