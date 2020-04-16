/*
|--------------------------------------------------------------------------
| auth token existence check
|--------------------------------------------------------------------------
*/
export function isAuth (state) {
  return !!state.authToken // true if token is set, false otherwise
}

/*
|--------------------------------------------------------------------------
| authentication status getter
|--------------------------------------------------------------------------
*/
export function authStatus (state) {
  return state.status // simply returns
}
