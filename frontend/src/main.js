import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/all.scss'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart, faShapes, faInfo, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'

library.add([
  faShoppingCart,
  faShapes,
  faInfo,
  faInfoCircle,
  faUser
]);

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
