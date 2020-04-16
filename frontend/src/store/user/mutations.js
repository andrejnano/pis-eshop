import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| user data and state mutations
|--------------------------------------------------------------------------
*/

export function USER_REQUEST (state) {
  state.status = 'loading'
}

export function USER_UPDATE (state) {
  state.status = 'updating'
}

export function USER_SUCCESS (state, response) {
  state.status = 'success'
  Vue.set(state, 'userData', response.data.user)
}

export function USER_ERROR (state) {
  state.status = 'error'
}

export function USER_LOGOUT (state) {
  Vue.set(state, 'userData', {})
  state.status = 'none'
}
