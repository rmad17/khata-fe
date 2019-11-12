
export const mutations = {
  updateProfile: function (state, profile) {
    state.profile = profile.data
  },
  updateDashboardInfo: function (state, dashboardInfo) {
    state.dashboardInfo = dashboardInfo.data
  },
  updateCategory: function (state, categories) {
    state.categories = categories.data
  }
}
