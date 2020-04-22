/*
|--------------------------------------------------------------------------
| shopping cart state mutations
|--------------------------------------------------------------------------
*/

export function CART_ADD_PRODUCT (state, product) {
  state.cartProducts.push(product)
  localStorage.setItem('shoppingCart', JSON.stringify(state.cartProducts))
}

export function CART_LOAD_PRODUCTS (state, products) {
  state.cartProducts = products
  localStorage.setItem('shoppingCart', JSON.stringify(state.cartProducts))
}

export function CART_REMOVE_PRODUCT (state, index) {
  state.cartProducts.splice(index, 1)
  localStorage.setItem('shoppingCart', JSON.stringify(state.cartProducts))
}

export function CART_CLEAR (state) {
  state.cartProducts = []
  localStorage.removeItem('shoppingCart')
}
