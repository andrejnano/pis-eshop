<template>
  <div class="checkout-page">

    <div class="featured-panel">

      <div class="title">Your cart</div>

      <div class="subtitle">Products in your cart:</div>

      <ul class="order-list">
        <li v-if="!cartHasProducts()">Your cart has no products. You can choose and add them at <router-link to="/categories">Products page</router-link>.</li>

        <li v-for="(product, index) in getCartProducts" :key="index" class="order-list-item">
          <button @click="removeFromCart(index)" class="remove-button"><font-awesome-icon :icon="['fad', 'times']" /></button>
          <font-awesome-icon :icon="['fad', product.icon ]" class="product-icon"/>
          <div class="item-info-box">
            <div class="product-name">{{product.name}}</div>
              <div class="product-configuration">
                OS: {{ product.configuration.os }}, RAM: {{ product.configuration.memory }}, vCPUs: {{ product.configuration.cpu }}, HDD: {{ product.configuration.hdd }}GB
            </div>
          </div>
          <div class="product-price">{{product.price}}<small>€/mo</small></div>
        </li>
      </ul>


      <div v-if="cartHasProducts()" class="checkout-proceed">
        <div class="subtitle">Total price: {{ totalPrice() }}€</div>

        <div class="buttons">

          <router-link to="/checkout" class="button primary-button">
            <span> Proceed to chcekout </span>
          </router-link>

          <button @click="clearCart" class="button clear-button">Clear cart</button>

        </div>


      </div>
    </div>
  </div>

</template>


<script>

import { mapGetters } from 'vuex';

export default {

  // data() {},

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
  padding:5rem;
  min-height: calc(100vh - 50px);
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
        font-size: 2rem;
        color:#5F5CFF;
      }

      .item-info-box {
        margin-right: auto;
        margin-left: 1rem;
        display: flex;
        flex-wrap: wrap;

        .product-name {
          font-weight: 600;
          font-size: 1.2rem;
          line-height: 1.2;
          width: 100%;
        }
        .product-configuration {
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 400;
          color: #666;
        }
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

  .checkout-proceed{

    .buttons{
      padding-top:2rem;

      .primary-button, .clear-button {
        text-decoration: none;
        margin: 2rem;
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

      .clear-button {
        color: #DD2222;
        margin-left: 1rem;
        border: 1px solid #DD2222;

        &:hover {
          border: 1px solid rgb(240, 34, 34);
          color: rgb(240, 34, 34);
          background: rgba(255, 0, 0, 0.1);
        }
      }
    }
  }
}

</style>
