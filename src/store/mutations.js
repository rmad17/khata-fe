
export const mutations = {
  updateProfile: function (state, profile) {
    state.profile = profile.responseData.data
  },
  updateDashboardInfo: function (state, dashboardInfo) {
    state.dashboardInfo = dashboardInfo.responseData.data
  }
}
