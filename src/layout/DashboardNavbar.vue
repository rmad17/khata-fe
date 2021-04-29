<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              expand>
      <ul class="navbar-nav align-items-center d-md-flex mr-8">
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
        <sidebar-item :link="{name: 'Transactions', icon: 'ni ni-key-25 text-info', path: '/transactions'}"/>
        <sidebar-item :link="{name: 'Reports', icon: 'ni ni-bullet-list-67 text-red', path: '/reports'}"/>
        <sidebar-item :link="{name: 'Categories', icon: 'ni ni-single-02 text-yellow', path: '/category'}"/>
        <sidebar-item :link="{name: 'Investments', icon: 'ni ni-single-02 text-yellow', path: '/investments'}"/>
      </ul>
      <div class="d-flex ml-8 pl-8 justify-content-end float-right">
        <base-dropdown class="ml-8 pl-8 nav-link pr-0">
          <div class="media" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <v-gravatar :email=profileData.email />
            </span>
            <div class="pt-1 pl-1 media-body ml-2 d-none d-lg-block" style="color: white">
                <span class="text-m font-family-lato font-weight-bold">{{ profileData.first_name  }}</span>
            </div>
          </div>
          <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Profile</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
          </router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
          </router-link>
        </base-dropdown>
      </div>
    </base-nav>
</template>
<script>
// Vuex
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeNotifications: false
    }
  },
  computed: {
    ...mapState({
      profileData: state => state.profile
    })
  },
  methods: {}
}
</script>
