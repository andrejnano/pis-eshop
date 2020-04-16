/*
|--------------------------------------------------------------------------
| user authentication state mutations
|--------------------------------------------------------------------------
*/

export function AUTH_CREATE (state) {
  state.status = 'creating'
}

export function AUTH_REQUEST (state) {
  state.status = 'loading'
}

export function AUTH_SUCCESS (state, authToken) {
  state.status = 'success'
  state.authToken = authToken
}

export function AUTH_ERROR (state) {
  state.status = 'error'
}

export function AUTH_LOGOUT (state) {
  state.authToken = ''
}
