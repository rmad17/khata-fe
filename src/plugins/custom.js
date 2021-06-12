import { CoolSelectPlugin } from 'vue-cool-select'
import 'vue-cool-select/dist/themes/bootstrap.css'

export default {
  install (Vue) {
    Vue.use(CoolSelectPlugin)
  }
}
