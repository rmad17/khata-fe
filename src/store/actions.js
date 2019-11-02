export default {
  updateProfile: function ({ commit }, profile) {
    commit('updateProfile', {
      profile,
      done: false
    })
  }
}
