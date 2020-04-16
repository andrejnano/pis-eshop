import axios from 'axios'

// todo: replace with config/import of env vars and pass in backend api url variable
const backend_api_url = "http://localhost:4000/api"

/*
|--------------------------------------------------------------------------
| Used when signing up / REGISTRATION / NEW USER ACCOUNT
|--------------------------------------------------------------------------
*/
export function AUTH_CREATE (context, credentials) {
  return new Promise((resolve, reject) => {
    context.commit('AUTH_CREATE')
    axios({ url: `${backend_api_url}/users`, data: credentials, method: 'POST' })
      .then((response) => {
        // store token in local storage
        const authToken = response.data.token
        localStorage.setItem('authToken', authToken)

        // make every next axios request attach token
        axios.defaults.headers.common['Authorization'] = authToken

        // finalize and dispatch User data request
        context.commit('AUTH_SUCCESS', authToken)
        context.dispatch('USER_REQUEST')
        resolve(response)
      })
      .catch((error) => {
        context.commit('AUTH_ERROR', error)
        localStorage.removeItem('authToken')
        reject(error)
      })
  })
}

/*
|--------------------------------------------------------------------------
| Used when signing in / LOG IN / AUTH to existing acc
|--------------------------------------------------------------------------
*/
export function AUTH_REQUEST (context, credentials) {
  return new Promise((resolve, reject) => {
    context.commit('AUTH_REQUEST')
    axios({ url: `${backend_api_url}/users/login`, data: credentials, method: 'POST' })
      .then((response) => {
        // store token in local storage TODO: this could be refactored into one reusable func
        const authToken = response.data.token
        localStorage.setItem('authToken', authToken)

        // make every axios request attach token
        axios.defaults.headers.common['Authorization'] = authToken

        // finalize and dispatch User data request
        context.commit('AUTH_SUCCESS', authToken)
        context.dispatch('USER_REQUEST')
        resolve(response)
      })
      .catch((error) => {
        context.commit('AUTH_ERROR', error)
        localStorage.removeItem('authToken')
        reject(error)
      })
  })
}

/*
|--------------------------------------------------------------------------
| // Used when signing out / LOG OUT
|--------------------------------------------------------------------------
*/
export function AUTH_LOGOUT (context) {
  return new Promise((resolve, reject) => {
    // finalize and dispatch user logout/ remove data
    context.commit('AUTH_LOGOUT')
    context.dispatch('USER_LOGOUT')

    // remove TOKEN from local storage
    localStorage.removeItem('authToken')

    resolve()
  })
}
