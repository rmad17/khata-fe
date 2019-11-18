<div>
</div>
<script>
export default {
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  },
  created: function () {
    this.logout()
  }
}
</script>
