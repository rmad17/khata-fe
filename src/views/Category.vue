<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div role="tablist">
                <b-card v-for="category in categories" :key=category.id header-border-variant="info" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1 button-toolbar" role="tab">
                  <b-modal :id="'c-edit-modal-' + category.id" hide-footer no-stacking hide-header-close header-bg-variant="light">
                    <base-model-input class="input-group-alternative mb-3 d-none"
                                        placeholder="name"
                                        v-model="category.id">
                    </base-model-input>
                    <base-model-input class="input-group-alternative mb-3"
                                        placeholder="description"
                                        v-model="category.name">
                    </base-model-input>
                    <base-model-input class="input-group-alternative mb-3"
                                        placeholder="description"
                                        v-model="category.description">
                    </base-model-input>
                    <b-button class="mt-3" block pill @click="updateCategory(category)">Close Me</b-button>
                  </b-modal>
                  <b-button class="ml-4 col-sm-9" pill v-b-toggle="'category-accordion-' + category.id" variant="outline-success">{{category.name}}</b-button>
                  <b-button class="m-2 mr-2 col-sm-1" v-b-modal="'c-edit-modal-' + category.id"><font-awesome-icon size="lg" icon="edit" :style="{color: 'gray'}"></font-awesome-icon></b-button>
                  <b-button class="m-2 mr-2 col-sm-1"><font-awesome-icon size="lg" icon="trash-alt" :style="{color: 'gray'}"></font-awesome-icon></b-button>
                </b-card-header>
                <b-collapse :id="'category-accordion-' + category.id" accordion="category-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text class="ml-4">{{ category.description }}</b-card-text>
                        <div>
                          <b-card v-for='tag in category.tags' :key='tag.id' no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                              <b-modal id="t-edit-modal">Hello From My T Modal!</b-modal>
                              <b-button class="text-left col-md-8" pill v-b-toggle="'tag-accordion-' + tag.id" variant="outline-peach">{{tag.name}}</b-button>
                              <b-button class="align-right m-2 col-sm-1" v-b-modal.t-edit-modal><font-awesome-icon size="lg" icon="edit" :style="{color: 'gray'}"></font-awesome-icon></b-button>
                              <b-button class="align-right m-2 col-sm-1"><font-awesome-icon size="lg" icon="trash-alt" :style="{color: 'gray'}"></font-awesome-icon></b-button>
                            </b-card-header>
                            <b-collapse :id="'tag-accordion-' + tag.id" accordion="tag-accordion" role="tabpanel">
                              <b-card-body>
                                <b-card-text>{{ tag.description }}</b-card-text>
                              </b-card-body>
                            </b-collapse>
                          </b-card>
                        </div>
                    </b-card-body>
                </b-collapse>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
// api
import { httpRequest } from '../api/index.js'
// Vuex
import { mapActions } from 'vuex'

export default {
  name: 'category',
  data: function () {
    return {
      showCollapse: true,
      categories: [],
      updatedCategory: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    categoryData: function () {
      return 1
      // return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['updateCategory'
    ]),
    getCategory: function () {
      var endpoint = 'statement/category/all/'
      httpRequest(endpoint, 'get', {}, {}, this.storeCategory)
    },
    storeCategory: function (responseData) {
      this.$store.dispatch('updateCategory', responseData.data)
      this.categories = [...responseData.data]
    },
    updateCategory: function (category) {
      console.log('Hello')
      let id = 'c-edit-modal-' + category.id
      console.log(id)
      this.$bvModal.hide(id)
      // this.$id['c-edit-modal-' + category.id].hide()
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style></style>
