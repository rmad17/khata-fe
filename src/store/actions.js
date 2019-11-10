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
  updateCategory: function ({ commit }, data) {
    commit('updateCategory', {
      data,
      done: false
    })
  }
}
