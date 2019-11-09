<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-4 d-flex align-items-center"
                     style="min-height: 3rem; background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-peach opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-md-4">
                        <h2 class="display-2 text-white" style="font-family: 'Lato', sans-serif;">
                          Hello {{ profileData.first_name }}
                        </h2>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <!-- <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image rounded-circle">
                                    <v-gravatar :email=profileData.email />
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="text-center">
                                <h3>
                                    {{ profileData.first_name }} {{ profileData.last_name }}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="col-xl-12 order-xl-2">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-2 pl-lg-4">My Account</h3>
                                </div>
                                <!-- <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div> -->
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted pl-lg-4 mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        name="username"
                                                        :value=profileData.username
                                                        @input="updateProfileStore"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        name="email"
                                                        :value=profileData.email
                                                        @input="updateProfileStore"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        name="first_name"
                                                        :value=profileData.first_name
                                                        @input="updateProfileStore"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        name="last_name"
                                                        :value=profileData.last_name
                                                        @input="updateProfileStore"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <base-button type="submit" @click="updateProfileData" size="md" class="ml-lg-4 btn btn-primary">Update</base-button>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// api
import { httpRequest } from '../api/index.js'
// Vuex
import { mapActions, mapState } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      profileData: state => state.profile
    })
  },
  methods: {
    ...mapActions([
      'updateProfile'
    ]),
    updateProfileStore: function (event) {
      let data = { 'data': {} }
      this.profileData[event.target.name] = event.target.value
      data['data'] = this.profileData
      this.updateProfile(this.profileData)
    },
    updateProfileData: function () {
      var endpoint = 'account/profile/'
      httpRequest(endpoint, 'put', this.profileData, {}, this.storeProfile)
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
<style></style>
