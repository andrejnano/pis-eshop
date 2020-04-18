export function addProduct(state, product) {
  state.cartProducts.push(product)
  localStorage.setItem('shoppingCart', JSON.stringify(state.cartProducts))
}

export function loadProducts(state, products) {
  state.cartProducts = products
  localStorage.setItem('shoppingCart', JSON.stringify(state.cartProducts))
}
