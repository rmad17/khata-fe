<template>
    <nav class="navbar"
         :class="[
            {'navbar-expand-md': expand},
            {'navbar-transparent': transparent},
            {[`bg-${type}`]: type}
         ]">
        <div :class="containerClasses">
            <slot name="brand">
                <router-link :to="$route.path"
                             class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
                    <!-- {{$route.name}} -->
                </router-link>
            </slot>
            <transition name="menu">
              <span v-if="getSidebar" @click="showSidebar">
                <font-awesome-icon size="lg" icon="bars"></font-awesome-icon>
              </span>
            </transition>

            <div class="collapse navbar-collapse"
                 :class="{show: toggled}"
                 :id="contentId"
                 v-click-outside="closeMenu">

                <slot :close-menu="closeMenu"></slot>
            </div>
        </div>
    </nav>
</template>
<script>

// Vuex
import { mapActions } from 'vuex'

export default {
  name: 'base-nav',
  props: {
    type: {
      type: String,
      default: '',
      description: 'Navbar type (e.g default, primary etc)'
    },
    title: {
      type: String,
      default: '',
      description: 'Title of navbar'
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
          "Explicit id for the menu. By default it's a generated random number"
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container-fluid'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    expand: {
      type: Boolean,
      default: false,
      description: 'Whether navbar should contain `navbar-expand-lg` class'
    },
    showToggleButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      toggled: false
    }
  },
  computed: {
    getSidebar: function () {
      if (!this.$store.state.showSidebar) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions(['changeSidebar'
    ]),
    closeMenu () {
      this.toggled = false
    },
    closeSidebar () {
      this.changeSidebar(false)
    },
    showSidebar () {
      this.changeSidebar(true)
    }
  }
}
</script>
<style>
.menu-enter { opacity: 0.5 }
.menu-leave-to { opacity: 0 }

.menu-leave { opacity: 0.2 }
.menu-enter-to { opacity: 1 }

.menu-enter-active { opacity: 0.7 }
.menu-leave-active { opacity: 0.8 }
</style>
