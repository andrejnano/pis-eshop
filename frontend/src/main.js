import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/all.scss'
import Vuelidate from 'vuelidate'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faShoppingCart, faShapes, faInfo, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLambda, faAngleDoubleRight, faHomeLg, faInfoCircle, faShoppingCart, faServer, faSignOut, faSparkles, faCubes, faGamepadAlt, faStream, faStore, faUserAlt, faSackDollar, faHandHoldingUsd, faBoxes, faHistory, faTrash, faEdit, faPlus } from '@fortawesome/pro-duotone-svg-icons'


library.add([
  faLambda,
  faAngleDoubleRight,
  faHomeLg,
  faInfoCircle,
  faShoppingCart,
  faSignOut,
  faSparkles,
  faStream,
  faStore,
  faUserAlt,
  faSackDollar,
  faHandHoldingUsd,
  faBoxes,
  faHistory,
  faServer,
  faGamepadAlt,
  faCubes,
  faTrash,
  faEdit,
  faPlus
]);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
