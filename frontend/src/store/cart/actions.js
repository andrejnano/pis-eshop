export function CART_ADD_PRODUCT (context, product) {
  context.commit('CART_ADD_PRODUCT', product);
}

export function CART_LOAD_PRODUCTS (context, products) {
  context.commit('CART_LOAD_PRODUCTS', products);
}

export function CART_REMOVE_PRODUCT (context, index) {
  context.commit('CART_REMOVE_PRODUCT', index);
}

export function CART_CLEAR (context) {
  context.commit('CART_CLEAR');
}
