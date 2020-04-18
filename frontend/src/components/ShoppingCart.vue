<template>
  <div class="shopping-cart">

    <template v-if="cartVisible">

      <div class="cart-window">
        <button @click="toggleVisibility">Hide cart</button>
        <h3>Shopping cart</h3>
        <ul class="shopping-cart-list">
          <li v-for="product in shoppingCart.cartProducts" :key="product.id" class="shopping-cart-list-item">
            {{ product.id }} - {{ product.productName }} [ ${{ product.price }} ]  <button>x</button>
          </li>
        </ul>

      <button>Create order</button> <button>Clear cart</button>

      </div>
    </template>
    <template v-else>
      <button @click="toggleVisibility" class="show-cart-button">
        <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Shopping cart" />
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      cartVisible: false,
      shoppingCart: {
        cartProducts: [
          {
            id: 12424,
            productName: "VPS 1",
            price: 24
          },
          {
            id: 62424,
            productName: "VPS 2",
            price: 56
          },
          {
            id: 42424,
            productName: "VPS 3",
            price: 43
          },
        ]
      }
    }
  },

  methods: {
    toggleVisibility: function() {
      this.cartVisible = !this.cartVisible;
    }
  }
}
</script>

<style lang="scss" scoped>

.show-cart-button {
  font-size: 2rem;
  padding: 1rem;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #ccc;
  color: #5F5CFF;
  box-shadow: 1px 1px 0px 0px #ddd;
  appearance: none;
  transition: background-color 100ms ease;

  &:hover {
    background-color: #5F5CFF;
    color: #fff;
    transition: background-color 100ms ease;
  }
}

.shopping-cart {
  z-index: 10;
  position: fixed;
  bottom: 0rem;
  right: 2rem;
  max-width: 350px;
  padding: 1rem;
  /* margin: 2rem; */
  text-align:center;


  .cart-window {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 3px 1px #ddd;
    max-width: 350px;
  }

  .shopping-cart-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    .shopping-cart-list-item {
      border: 1px solid blue;
      padding: 1rem 2rem;
      margin: 1rem;
    }
  }
}

</style>
