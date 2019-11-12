<template>
    <div>
        <base-header type="gradient-peach" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div role="tablist">
                <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                    <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>

                <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>

                <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block href="#" v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
                </b-card>
            </div>
          <b-card class="accordion">
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
          </b-card>
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
