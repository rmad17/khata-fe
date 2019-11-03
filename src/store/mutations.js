
export const mutations = {
  updateProfile: function (state, profile) {
    state.profile = profile.responseData.data
    if (profile.responseData.data.is_active === 'True') {
      state.profile.is_active = true
    } else {
      state.profile.is_active = false
    }
  },
  updateDashboardInfo: function (state, dashboardInfo) {
    state.dashboardInfo = dashboardInfo.responseData.data
  }
}
