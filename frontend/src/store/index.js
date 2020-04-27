import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import user from './user'
import cart from './cart'

Vue.use(Vuex)

/*
|--------------------------------------------------------------------------
| Global state initialization and management
|--------------------------------------------------------------------------
|
| State object is separated into underlying submodules
|
*/

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    cart
  }
});


export default store
