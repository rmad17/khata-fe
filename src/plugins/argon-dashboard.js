import '@/assets/vendor/nucleo/css/nucleo.css'
import '@/assets/scss/argon.scss'
import globalComponents from './globalComponents'
import globalDirectives from './globalDirectives'
import SidebarPlugin from '@/components/SidebarPlugin/index'
import NotificationPlugin from '@/components/NotificationPlugin/index'
import BootstrapVue from 'bootstrap-vue'

export default {
  install (Vue) {
    Vue.use(globalComponents)
    Vue.use(globalDirectives)
    Vue.use(SidebarPlugin)
    Vue.use(NotificationPlugin)
    Vue.use(BootstrapVue)
  }
}
