export default {
  updateProfile: function ({ commit }, data) {
    commit('updateProfile', {
      data,
      done: false
    })
  },
  updateDashboardInfo: function ({ commit }, data) {
    commit('updateDashboardInfo', {
      data,
      done: false
    })
  },
  updateCategories: function ({ commit }, data) {
    commit('updateCategories', {
      data,
      done: false
    })
  },
  updateTransactions: function ({ commit }, data) {
    commit('updateTransactions', {
      data,
      done: false
    })
  },
  updateChartData: function ({ commit }, data) {
    commit('updateChartData', {
      data,
      done: false
    })
  }
}
