<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div role="tablist">
              <!-- Category -->
                <b-card class="col-sm-8 shadow mb-1 opacity-6" header-border-variant="info" no-body>
                  <b-card-header header-tag="header" class="p-1 pl-2 pr-4 button-toolbar" role="tab">
                    <b-input class=" ml-3 m-2 mr-4 col-sm-10 shadow" v-model="newCategory" @keyup.enter.native="addNewCategory" placeholder="Add a new category ..." square variant="outline-primary"/>
                  </b-card-header>
                </b-card>
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
                    <b-button class="mt-3 shadow" variant="success" square @keyup.enter.native="updateCategory(category)" @click="updateCategory(category)">Update</b-button>
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
                      <b-card-text class="accordion-desc-text ml-4">{{ category.description }}</b-card-text>
                        <div>
                          <!-- Tags -->
                          <b-card v-for='tag in category.tags' :key='tag.id' no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                              <!-- Edit Tag Modal -->
                              <b-modal :id="'tag-edit-modal-' + tag.id" hide-footer no-stacking hide-header-close>
                                <base-model-input class="input-group-alternative mb-3 d-none"
                                                    :value="updatedTag.category_id">
                                </base-model-input>
                                <base-model-input class="input-group-alternative mb-3 d-none"
                                                    :value="updatedTag.tag_id">
                                </base-model-input>
                                <base-model-input class="input-group-alternative mb-3"
                                                    placeholder="name"
                                                    v-model="updatedTag.name">
                                </base-model-input>
                                <base-model-input class="input-group-alternative mb-3"
                                                    placeholder="description"
                                                    v-model="updatedTag.description">
                                </base-model-input>
                                <b-button class="mt-3 shadow" variant="danger" square @click="$bvModal.hide('tag-edit-modal-' + tag.id)">Cancel</b-button>
                                <b-button class="mt-3 shadow" variant="success" square @keyup.enter.native="updateTag(tag)" @click="updateTag(tag)">Update</b-button>
                              </b-modal>
                              <!-- Delete Tag Modal -->
                              <b-modal :id="'tag-del-modal-' + tag.id" hide-footer no-stacking hide-header-close title="Delete Confirmation">

                                <p> Do you really want to delete this tag? </p>
                                <b-button class="mt-3 shadow" variant="light" square @click="$bvModal.hide('tag-del-modal-' + tag.id)">Cancel</b-button>
                                <b-button class="mt-3 shadow" variant="danger" square @click="delTag(tag)">Delete</b-button>
                              </b-modal>
                              <b-button class="text-left col-md-8" square v-b-toggle="'tag-accordion-' + tag.id" variant="outline-peach">{{tag.name}}</b-button>
                              <b-button class="align-right m-2 col-sm-1" @click="openEditTagModal(tag)"><font-awesome-icon size="lg" icon="edit"></font-awesome-icon></b-button>
                              <b-button class="align-right m-2 col-sm-1" v-b-modal="'tag-del-modal-' + tag.id"><font-awesome-icon size="lg" icon="trash-alt"></font-awesome-icon></b-button>
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
      },
      newCategory: '',
      updatedTag: {
        category_id: '', 
        tag_id: '',
        name: '',
        description: ''
      },
      newTag: ''
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
    addNewCategory: function () {
      let name = this.newCategory
      this.newCategory = ''
      var endpoint = 'statement/category/'
      httpRequest(endpoint, 'post', { name: name }, {}, this.postUpdate)
    },
    openEditTagModal: function (tag) {
      let id = 'tag-edit-modal-' + tag.id
      this.updatedTag.tag_id = tag.id
      this.updatedTag.name = tag.name
      this.updatedTag.description = tag.description
      this.$bvModal.show(id)
    },
    delTag: function (tag) {
      var endpoint = 'statement/tag/'
      httpRequest(endpoint, 'delete', { tag_id: tag.id }, {}, this.postUpdate)
    },
    updateTag: function (tag) {
      let id = 'tag-edit-modal-' + tag.id
      this.$bvModal.hide(id)
      var endpoint = 'statement/tag/'
      httpRequest(endpoint, 'put', this.updatedTag, {}, this.postUpdate)
      this.updatedTag = { tag_id: '', name: '', description: '' }
    },
    addNewTag: function () {
      let name = this.newTag
      this.newTag = ''
      var endpoint = 'statement/tag/'
      httpRequest(endpoint, 'post', { name: name }, {}, this.postUpdate)
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
<style>
.opacity-6 {
  opacity: 0.6;
}
.opacity-45 {
  opacity: 0.45;
}
.accordion-desc-text {
  font-weight: 600;
}
</style>
