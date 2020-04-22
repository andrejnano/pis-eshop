<template>
  <div class="shopping-cart">

    <template v-if="cartVisible">

      <div class="cart-window">
        <div class="top-menu">
          <button @click="toggleVisibility" title="Hide cart" class="hide-button"><font-awesome-icon :icon="['fad','window-minimize']"/></button>
          <button @click="clearCart" class="clear-button">Clear cart</button>
        </div>
        <ul class="shopping-cart-list">
          <li v-if="!cartHasProducts()">No products</li>

          <li v-for="(product, index) in getCartProducts" :key="index" class="shopping-cart-list-item">
            <button @click="removeFromCart(index)" class="remove-button"><font-awesome-icon :icon="['fad', 'times']" /></button>
            <font-awesome-icon :icon="['fad', product.icon ]" class="product-icon"/>
            <div class="product-name">{{product.name}}</div>
            <div class="product-configuration">[{{product.configuration}}]</div>
            <div class="product-price">{{product.price}}<small>€/mo</small></div>
          </li>

        </ul>
        <div v-if="cartHasProducts()" class="cart-summary">
          <span>Total: {{ totalPrice() }}€</span>
          <router-link to="/checkout">
            <button>Create order</button>
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <button @click="toggleVisibility" class="show-cart-button">
        <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Shopping cart" />

        <span v-if="cartHasProducts()" class="quantity-ticker">{{ totalQuantity() }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ShoppingCart',
  data() {
    return {
      cartVisible: false,

      exampleProduct: {
        name: "Docker 2",
        configuration: "TeamSpeak3",
        category: "Containers",
        icon: "server",
        price: 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
      },

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
    },

    addToCart: function(product) {
      this.$store.dispatch('CART_ADD_PRODUCT', product)
    },

    removeFromCart: function(index) {
      this.$store.dispatch('CART_REMOVE_PRODUCT', index)
    },

    clearCart: function() {
      this.$store.dispatch('CART_CLEAR');
    },

    loadCart: function() {
      this.$store.dispatch('CART_LOAD_PRODUCTS')
    },

    cartHasProducts: function() {
      return this.getCartProducts.length > 0;
    },

    totalPrice: function() {
      return this.getCartProducts.reduce((acc, next) => acc + next.price, 0);
    },


    totalQuantity: function() {
      return this.getCartProducts.length;
    }


  },


  computed: {
    ...mapGetters([
      'getCartProducts'
    ]),
  },


  mounted() {

    this.addToCart(this.exampleProduct)

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


  .quantity-ticker {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    /* transform: translateX(-50%); */
    font-size: 1.3rem;
    color: #666;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.shopping-cart {
  z-index: 10;
  position: fixed;
  bottom: 0rem;
  right: 2rem;
  max-width: 500px;
  padding: 1rem;
  /* margin: 2rem; */
  text-align:center;


  .cart-window {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 3px 1px #ddd;
    max-width: 500px;
    width: 400px;

    .top-menu {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
      border-bottom: 1px solid #ccc;

      .hide-button {
        padding: 1rem;
      }
    }

    .cart-summary {
      background: #fafafa;
      border-top: 1px solid #ccc;
    }

  }

  .shopping-cart-list {
    list-style: none;
    padding: 1rem;
    max-height: 50vh;
    overflow-y: scroll;
    width: auto;
    /* overflow-x: auto; */

    .shopping-cart-list-item {
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      flex-direction: row;
      /* flex-wrap: wrap; */
      align-items: center;
      width: 100%;

      &:hover {
        background: rgb(247, 247, 255);
        cursor: pointer;
      }

      .remove-button {
        color: red;
        font-size: 1.2rem;
        margin-top: 2px;
        border-radius: 50%;
        padding: 1rem;
        margin-right: 0.5rem;

        &:hover {
          background: rgba(255, 0, 0, 0.1);
        }
      }

      .product-icon {
        margin-right: 0.5rem;
      }
      .product-name {
        font-weight: 800;
        margin-right: 0.5rem;
      }
      .product-configuration {
        font-size: 1rem;
        font-weight: 400;
        color: #666;
        margin-right: auto;
      }

      .product-price {
        font-weight: 500;

        > small {
          margin-top: -10px;
          color: #666;
          position: relative;
        }
      }
    }
  }


}

</style>
