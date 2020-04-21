import axios from 'axios'

// todo: replace with config/import of env vars and pass in backend api url variable
const backend_api_url = "http://localhost:4000/api"

/*
|--------------------------------------------------------------------------
| used to get user data from backend
|--------------------------------------------------------------------------
*/
export function USER_REQUEST (context) {
  return new Promise((resolve, reject) => {
    context.commit('USER_REQUEST')
    axios({ url: `${backend_api_url}/users`, method: 'GET' })
      .then((response) => {
        context.commit('USER_SUCCESS', response)
        resolve(response)
      })
      .catch((error) => {
        console.error(error)
        context.commit('USER_ERROR')
        context.dispatch('AUTH_LOGOUT')
        reject(error)
      })
  })
}

/*
|--------------------------------------------------------------------------
| uset to upade user data to backend
|--------------------------------------------------------------------------
*/
export function USER_UPDATE (context, credentials) {
  return new Promise((resolve, reject) => {
    context.commit('USER_UPDATE')
    axios({ url: `${backend_api_url}/users`, data: credentials, method: 'PUT' })
      .then((response) => {
        context.commit('USER_SUCCESS', response)
        resolve(response)
      })
      .catch((error) => {
        console.error(error)
        context.commit('USER_ERROR')
        context.dispatch('AUTH_LOGOUT')
        reject(error)
      })
  })
}

/*
|--------------------------------------------------------------------------
| uset to delete user data on backend
|--------------------------------------------------------------------------
*/
export function USER_DELETE (context, credentials) {
  return new Promise((resolve, reject) => {
    context.commit('USER_UPDATE')
    axios({ url: `${backend_api_url}/users`, data: credentials, method: 'DELETE' })
      .then((response) => {
        context.dispatch('AUTH_LOGOUT')
        context.commit('USER_LOGOUT', response)
        resolve(response)
      })
      .catch((error) => {
        console.error(error)
        context.commit('USER_ERROR')
        reject(error)
      })
  })
}

/*
|--------------------------------------------------------------------------
| uset to remove temp. user data from client
|--------------------------------------------------------------------------
*/
export function USER_LOGOUT (context) {
  context.commit('USER_LOGOUT')
}

export function USER_SET_ADMIN_FLAG (context, isAdmin) {
  context.commit('USER_SET_ADMIN_FLAG', isAdmin)
}
