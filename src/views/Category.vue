<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div role="tablist">
                <b-card v-for="category in categories" :key=category.id
                  no-body class="mb-1"
                >
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <div block v-b-toggle="'category-accordion-' + category.id" variant="info">{{category.name}}</div>
                </b-card-header>
                <b-collapse :id="'category-accordion-' + category.id" accordion="category-accordion" role="tabpanel">
                    <b-card-body>
                    <div>
                      <b-card v-for='tag in category.tags' :key='tag.id' no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                          <div block v-b-toggle="'tag-accordion-' + tag.id" variant="info">{{tag.name}}</div>
                        </b-card-header>
                        <b-collapse :id="'tag-accordion-' + tag.id" accordion="tag-accordion" role="tabpanel">
                          <b-card-body>
                            <b-card-text>{{ tag.name }}</b-card-text>
                          </b-card-body>
                        </b-collapse>
                        </b-card>
                      </div>
                    </b-card-body>
                </b-collapse>
                </b-card>
            </div>
          <!-- <b-card class="accordion">
            <ul>
                <li data-toggle="collapse"  v-for="category in categories" :key=category.id>
                    <div v-b-toggle.accordion-1 variant="info"> {{ category.name }} </div>
                <ul>
                    <li v-for='tag in category.tags' :key='tag.id'>
                    {{ tag.name }}
                    </li>
                </ul>
                </li>
            </ul>
          </b-card> -->
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
      categories: []
    }
  },
  computed: {
    categoryData: function () {
      return this.$store.state.categories
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
      this.categories = responseData.data
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style></style>
