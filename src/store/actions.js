export default {
  changeSidebar: function ({ commit }, value) {
    commit('changeSidebar', {
      value,
      done: true
    })
  },
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
