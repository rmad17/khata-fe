<template>
  <div class="">
    <div class="custom-shadow fixed-top">
      <base-header class="text-white pb-1 pl-2">
        <dashboard-navbar></dashboard-navbar>
      </base-header>
    </div>
    <div class="container-fluid bg-lightest mt-4 pt-6">
      <router-view></router-view>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
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
