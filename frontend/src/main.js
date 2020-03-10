import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/all.scss'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faShoppingCart, faShapes, faInfo, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLambda, faAngleDoubleRight, faHomeLg, faInfoCircle, faShoppingCart, faSignOut, faSparkles, faStream, faStore, faUserAlt, faSackDollar, faHandHoldingUsd, faBoxes, faHistory } from '@fortawesome/pro-duotone-svg-icons'


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
  faHistory
]);

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
