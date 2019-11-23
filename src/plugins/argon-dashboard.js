import '@/assets/vendor/nucleo/css/nucleo.css'
import '@/assets/scss/argon.scss'
import globalComponents from './globalComponents'
import globalDirectives from './globalDirectives'
import SidebarPlugin from '@/components/SidebarPlugin/index'
import NotificationPlugin from '@/components/NotificationPlugin/index'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faEdit, faTag, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  install (Vue) {
    Vue.use(globalComponents)
    Vue.use(globalDirectives)
    Vue.use(SidebarPlugin)
    Vue.use(NotificationPlugin)
    Vue.use(BootstrapVue)
    // Font Awesome
    // library.add(fab)
    library.add(faBars)
    library.add(faEdit)
    library.add(faTag)
    library.add(faTrashAlt)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}
