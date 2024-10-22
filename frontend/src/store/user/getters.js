/*
|--------------------------------------------------------------------------
| user data and state getters
|--------------------------------------------------------------------------
*/

export function getUserData (state) {
  return state.userData
}

export function isUserDataLoaded (state) {
  return !!state.userData.email
}

export function isAdmin (state) {
  return state.isAdmin
}
