<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div role="tablist">
                <b-card class="col-sm-8 shadow mb-1" v-for="category in categories" :key=category.id header-border-variant="info" no-body>
                <b-card-header header-tag="header" class="p-1 button-toolbar" role="tab">
                  <!-- Edit Category Modal -->
                  <b-modal :id="'category-edit-modal-' + category.id" hide-footer no-stacking hide-header-close>
                    <base-model-input class="input-group-alternative mb-3 d-none"
                                        :value="updatedCategory.category_id">
                    </base-model-input>
                    <base-model-input class="input-group-alternative mb-3"
                                        placeholder="name"
                                        v-model="updatedCategory.name">
                    </base-model-input>
                    <base-model-input class="input-group-alternative mb-3"
                                        placeholder="description"
                                        v-model="updatedCategory.description">
                    </base-model-input>
                    <b-button class="mt-3 shadow" variant="danger" square @click="$bvModal.hide('category-edit-modal-' + category.id)">Cancel</b-button>
                    <b-button class="mt-3 shadow" variant="success" square @click="updateCategory(category)">Update</b-button>
                  </b-modal>
                  <!-- Delete Category Modal -->
                  <b-modal :id="'category-del-modal-' + category.id" hide-footer no-stacking hide-header-close title="Delete Confirmation">
                    <p> Do you really want to delete this category? </p>
                    <b-button class="mt-3 shadow" variant="light" square @click="$bvModal.hide('category-del-modal-' + category.id)">Cancel</b-button>
                    <b-button class="mt-3 shadow" variant="danger" square @click="delCategory(category)">Delete</b-button>
                  </b-modal>
                  <b-button class="ml-4 col-sm-8 shadow-lg" square v-b-toggle="'category-accordion-' + category.id" variant="outline-primary">{{category.name}}</b-button>
                  <b-button class="m-2 mr-2 col-sm-1 shadow" variant="outline-primary" @click="openEditCategoryModal(category)" v-b-modal="'category-edit-modal-' + category.id"><font-awesome-icon size="lg" icon="edit"  :style="{color: '#5e72e4'}"></font-awesome-icon></b-button>
                  <b-button class="m-2 mr-2 col-sm-1 shadow" variant="outline-primary" v-b-modal="'category-del-modal-' + category.id"><font-awesome-icon size="lg" icon="trash-alt"  :style="{color: '#5e72e4'}"></font-awesome-icon></b-button>
                </b-card-header>
                <b-collapse :id="'category-accordion-' + category.id" accordion="category-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text class="ml-4">{{ category.description }}</b-card-text>
                        <div>
                          <b-card v-for='tag in category.tags' :key='tag.id' no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                              <b-modal id="t-edit-modal">Hello From My T Modal!</b-modal>
                              <b-button class="text-left col-md-8" square v-b-toggle="'tag-accordion-' + tag.id" variant="outline-peach">{{tag.name}}</b-button>
                              <b-button class="align-right m-2 col-sm-1" v-b-modal.t-edit-modal><font-awesome-icon size="lg" icon="edit" :style="{color: '#f8a978'}"></font-awesome-icon></b-button>
                              <b-button class="align-right m-2 col-sm-1"><font-awesome-icon size="lg" icon="trash-alt" :style="{color: '#f8a978'}"></font-awesome-icon></b-button>
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
        category_id: '',
        name: '',
        description: ''
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['updateCategory'
    ]),
    getCategories: function () {
      var endpoint = 'statement/category/all/'
      httpRequest(endpoint, 'get', {}, {}, this.fetchCategories)
    },
    fetchCategories: function (responseData) {
      this.categories = [...responseData.data]
      this.$store.dispatch('updateCategories', responseData.data)
    },
    openEditCategoryModal: function (category) {
      let id = 'category-edit-modal-' + category.id
      this.updatedCategory.category_id = category.id
      this.updatedCategory.name = category.name
      this.updatedCategory.description = category.description
      this.$bvModal.show(id)
    },
    delCategory: function (category) {
      var endpoint = 'statement/category/'
      httpRequest(endpoint, 'delete', { category_id: category.id }, {}, this.postUpdate)
    },
    updateCategory: function (category) {
      let id = 'category-edit-modal-' + category.id
      this.$bvModal.hide(id)
      var endpoint = 'statement/category/'
      httpRequest(endpoint, 'put', this.updatedCategory, {}, this.postUpdate)
      this.updatedCategory = { category_id: '', name: '', description: '' }
    },
    postUpdate: function (responseData) {
      this.getCategories()
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>
<style></style>
