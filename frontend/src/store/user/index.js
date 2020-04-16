import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

/*
|--------------------------------------------------------------------------
| setup of user state module
|--------------------------------------------------------------------------
*/
export default {
  // namespaced: true,
  getters,
  mutations,
  actions,
  state
}
