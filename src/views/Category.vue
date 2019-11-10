<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table title="Light Table"></projects-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProjectsTable from './Tables/ProjectsTable'
// api
import { httpRequest } from '../api/index.js'
// Vuex
import { mapActions, mapState } from 'vuex'

export default {
  name: 'tables',
  components: {
    ProjectsTable
  },
  computed: {
    ...mapState({
      categoryData: state => state.category
    })
  },
  methods: {
    ...mapActions([
      'updateCategory'
    ]),
    getCategory: function () {
      var endpoint = 'statement/category/all/'
      httpRequest(endpoint, 'get', {}, {}, this.storeCategory)
    },
    storeCategory: function (responseData) {
      this.$store.dispatch('updateCategory', responseData.data)
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style></style>
