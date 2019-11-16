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
  }
 }
