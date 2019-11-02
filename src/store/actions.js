export default {
  updateProfile: function ({ commit }, responseData) {
    commit('updateProfile', {
      responseData,
      done: false
    })
  },
  updateDashboardInfo: function ({ commit }, responseData) {
    commit('updateDashboardInfo', {
      responseData,
      done: false
    })
  }
}
