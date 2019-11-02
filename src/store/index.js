import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import getters from './getters'

Vue.config.devtools = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    dashboardInfo: {},
    transactions: {}
  },
  actions,
  getters,
  mutations
})
