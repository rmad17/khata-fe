<template>
  <div class="wrapper" :class="{ 'nav-open': getSidebar }">
    <transition name="drawer">
      <side-bar
        :background-color="sidebarBackground"
        short-title="Personal Expense Manager"
        title="Khata" v-if="getSidebar"
      >
        <template slot="links">
          <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
          <sidebar-item :link="{name: 'Transactions', icon: 'ni ni-key-25 text-info', path: '/transactions'}"/>
          <sidebar-item :link="{name: 'Reports', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
          <sidebar-item :link="{name: 'Categories', icon: 'ni ni-single-02 text-yellow', path: '/category'}"/>
          <sidebar-item :link="{name: 'Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        </template>
      </side-bar>
    </transition>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div>
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

// Vuex
import { mapActions, mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters([
    ]),
    getSidebar: function () {
      return this.$store.state.showSidebar
    }
  },
  methods: {
    ...mapActions(['changeSidebar'
    ]),
    toggleSidebar () {
      if (this.$store.state.showSidebar) {
        this.$store.dispatch('changeSidebar', false)
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
.drawer-enter { opacity: 0.3 }
.drawer-leave-to { opacity: 0 }

.drawer-leave { opacity: 0.7 }
.drawer-enter-to { opacity: 1 }

.drawer-enter-active { opacity: 0.7 }
.drawer-leave-active { transition: opacity 300ms;  opacity: 0.3 }
</style>
