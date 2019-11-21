<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Personal Expense Manager"
      title="Khata"
    >
      <template slot="links">
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
        <sidebar-item :link="{name: 'Transactions', icon: 'ni ni-key-25 text-info', path: '/transactions'}"/>
        <sidebar-item :link="{name: 'Reports', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Categories', icon: 'ni ni-single-02 text-yellow', path: '/category'}"/>
        <sidebar-item :link="{name: 'Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import { FadeTransition } from 'vue2-transitions'

// api
import { httpRequest } from '../api/index.js'

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data () {
    return {
      sidebarBackground: 'vue' // vue|blue|orange|green|red|primary
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
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
<style lang="scss">
</style>
