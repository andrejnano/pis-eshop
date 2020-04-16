/*
|--------------------------------------------------------------------------
| initial auth module state
|--------------------------------------------------------------------------
*/

export default {
  authToken: localStorage.getItem('authToken') || '',
  status: '' // loading, success, error
}
