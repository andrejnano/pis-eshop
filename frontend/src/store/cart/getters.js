/*
|--------------------------------------------------------------------------
| get all products in the cart
|--------------------------------------------------------------------------
*/
export function getCartProducts (state)  {
  return state.cartProducts
}

export function cartEmpty (state)  {
  return state.cartProducts.length === 0;
}
