<template>
  <div class="wrapper">
    <div class="main-content">
      <dashboard-navbar></dashboard-navbar>
      <div>
        <base-header class="shadow-lg text-white pb-1 pl-6 pt-md-6">
        </base-header>
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'

// api
import { httpRequest } from '../api/index.js'

export default {
  components: {
    DashboardNavbar,
    ContentFooter
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    getProfile: function () {
      var endpoint = 'account/profile/'
      httpRequest(endpoint, 'get', {}, {}, this.storeProfile)
    },
    storeProfile: function (responseData) {
      this.$store.dispatch('updateProfile', responseData.data)
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
