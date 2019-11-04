
export const mutations = {
  updateProfile: function (state, profile) {
    state.profile = profile.responseData.data
  },
  updateProfileLocal: function (state, profile) {
    state.profile = profile
  },
  updateDashboardInfo: function (state, dashboardInfo) {
    state.dashboardInfo = dashboardInfo.responseData.data
  }
}
