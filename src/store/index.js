import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import getters from './getters'

Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    profile: {},
    dashboardInfo: {},
    transaction: {},
    category: {}
  },
  actions,
  getters,
  mutations
})
