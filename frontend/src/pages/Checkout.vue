<template>
  <div class="checkout-page">

    <div class="featured-panel">

      <div class="title">Checkout</div>

      <div class="subtitle">Products in your order:</div>

      <ul class="order-list">
        <li v-if="!cartHasProducts()">Your cart has no products. You can choose and add them at <router-link to="/categories">Products page</router-link>.</li>

        <li v-for="(product, index) in getCartProducts" :key="index" class="order-list-item">
          <button @click="removeFromCart(index)" class="remove-button"><font-awesome-icon :icon="['fad', 'times']" /></button>
          <font-awesome-icon :icon="['fad', product.icon ]" class="product-icon"/>
          <div class="product-name">{{product.name}}</div>
          <div class="product-configuration">[{{product.configuration}}]</div>
          <div class="product-price">{{product.price}}<small>€/mo</small></div>
        </li>
      </ul>

      <div v-if="cartHasProducts()" class="order-confirm">

        <div class="subtitle">Choose payment type:</div>

        <div class="payment-type">
          <input type="radio" id="PayPal" value="PayPal" v-model="payment">
          <label for="PayPal">PayPal</label>
          <br>
          <input type="radio" id="PaySafeCard" value="PaySafeCard" v-model="payment">
          <label for="PaySafeCard">PaySafeCard</label>
          <br>
          <input type="radio" id="BankTransfer" value="BankTransfer" v-model="payment">
          <label for="BankTransfer">Bank transfer</label>
          <br>
          <input type="radio" id="Bitcoin" value="Bitcoin" v-model="payment">
          <label for="Bitcoin">Bitcoin</label>
          <br>
          <input type="radio" id="GoPay" value="GoPay" v-model="payment">
          <label for="GoPay">GoPay</label>
        </div>

        <!-- TODO - check that payment option is selected, or select one by default? -->

        <div class="subtitle">Total: {{ totalPrice() }}€</div>

        <router-link to="/orders" class="button primary-button">
          <span  @click="clearCartAndCreateOrder"> Confirm order </span>
        </router-link>
      </div>
    </div>
  </div>

</template>


<script>

import axios from 'axios';

import { mapGetters } from 'vuex';

export default {

  data() {
    return {
      products: this.getCartProducts,
      price: 0,
      payment: null
    }
  },

  methods: {
    cartHasProducts: function() {
      return this.getCartProducts.length > 0;
    },
    totalPrice: function() {
      return this.getCartProducts.reduce((acc, next) => acc + next.price, 0);
    },
    removeFromCart: function(index) {
     this.$store.dispatch('CART_REMOVE_PRODUCT', index)
    },
    clearCart: function() {
      this.$store.dispatch('CART_CLEAR');
    },

    clearCartAndCreateOrder: function () {
      this.createOrder();
      this.clearCart();
    },

    createOrder: function() {
      let order = {
        "payment": this.payment,
        "price": this.totalPrice(),
        "products": ['5ea4a02a90cbe20017d8a318', '5ea4a02a90cbe20017d8a31c']
        // "products": this.getCartProducts(),  - TODO - funkcia getCartProducts musi vracat id-cka produktov, nie cele objekty
      }

      console.log(order);

      axios.post('http://localhost:4000/api/orders/', order)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
  },

  computed: {
    ...mapGetters([
      'getCartProducts'
    ]),
  },
}
</script>


<style lang="scss" scoped>

.featured-panel {
  width: 100%;
  background: rgb(247, 247, 255);

  min-height: calc(100vh - 50px);
  max-width: 90vw;
  margin: 0 auto;
  color: #000;
  display: flex;
  flex-direction: column;

  .title {
    margin-top: 4rem;
    font-size: 3rem;
    font-weight: 600;
  }

  .subtitle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
    color: #5F5CFF;
  }

  li a {
    text-decoration: none;
    color: #5F5CFF;
  }

  .order-list {
    list-style: none;
    padding: 1rem;
    max-height: 50vh;
    overflow-y: scroll;
    width: auto;
    /* overflow-x: auto; */

    .order-list-item {
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      flex-direction: row;
      /* flex-wrap: wrap; */
      align-items: center;
      width: 100%;

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

  .order-confirm {

    .primary-button, .secondary-button {
      text-decoration: none;
      padding: auto 2rem;
      transition: background-color 100ms linear;
      border-radius: 4px;
    }

    .primary-button {
      background-color: #5F5CFF;
      border: 1px solid #5F5CFF;
      color: #fff;

      &:hover {
        background-color: rgb(51, 47, 255);
      }
    }

    .secondary-button {
      color: #5F5CFF;
      margin-left: 1rem;
      border: 1px solid #5F5CFF;

      &:hover {
        border: 1px solid rgb(51, 47, 255);
        color: rgb(51, 47, 255);
      }
    }
  }

}

</style>
