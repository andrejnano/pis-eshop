<template>
  <div class="shopping-cart">

    <template v-if="cartVisible">

      <div class="cart-window">
        <div class="top-menu">
          <button @click="toggleVisibility" title="Hide cart" class="button"><font-awesome-icon :icon="['fad','window-minimize']"/></button>
          <button v-if="cartHasProducts()" @click="clearCart" class="button">Clear cart <font-awesome-icon :icon="['fad','trash-alt']"/></button>
        </div>
        <ul class="shopping-cart-list">
          <li v-if="!cartHasProducts()">No products</li>

          <li v-for="(product, index) in getCartProducts" :key="index" class="shopping-cart-list-item">

            <font-awesome-icon :icon="['fad', product.icon ]" class="product-icon"/>
            <div class="item-info-box">
              <div class="product-name">{{product.name}}</div>
                <div class="product-configuration">
                  OS: {{ product.configuration.os }}, RAM: {{ product.configuration.memory }}, vCPUs: {{ product.configuration.cpu }}, HDD: {{ product.configuration.hdd }}GB
                </div>
            </div>
            <div class="product-price">{{product.price}}<small>€/mo</small></div>

            <button @click="removeFromCart(index)" class="remove-button"><font-awesome-icon :icon="['fad', 'times']" /></button>
          </li>

        </ul>
        <div v-if="cartHasProducts()" class="cart-summary">
          <span class="total-price">Total: <span class="price-value">{{ totalPrice() }}€</span></span>
          <router-link to="/checkout">
            <button class="button" @click="toggleVisibility">Create order <font-awesome-icon :icon="['fad','shopping-cart']"/></button>
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <button @click="toggleVisibility" class="show-cart-button">
        <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Shopping cart" />
        <transition name="bounce">
          <span :key="totalQuantity()" v-if="cartHasProducts()" class="quantity-ticker">{{ totalQuantity() }}</span>
        </transition>
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
      tickerBounce: false,
      exampleProduct: {
        _id: "5ea5ceeb10c9cc013f7aecd3",
        name: "Docker 2",
        configuration: "TeamSpeak3",
        category: "Containers",
        icon: "server",
        price: 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
      },

      shoppingCart: {
        cartProducts: [ ]
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

  watch: {
    getCartProducts() {
      this.tickerBounce = true;
      setTimeout(function() {
        this.tickerBounce = false;
      }.bind(this), 1000);
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
  transition: background-color 200ms ease;
  color: rgb(176, 176, 176);
  background-color:rgb(70, 70, 70);

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
    background-color: #5F5CFF;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;


    &.spin {
      animation:spin 2s linear infinite;
      @keyframes spin { 100% { -webkit-transform: rotateZ(360deg); transform:rotateZ(360deg); } }
    }
  }
}

.shopping-cart {

  @media screen and (max-width: 900px) {
    z-index: 10;
    position: fixed;
    bottom: 50px;
    max-width: 90vw;
    right: 5vw;
  }

  @media screen and (min-width: 901px) {
    z-index: 10;
    position: fixed;
    bottom: 0rem;
    right: 2rem;
    max-width: 500px;
    padding: 1rem;
  }
  /* margin: 2rem; */

  .cart-window {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 3px 1px #ddd;
    max-width: 500px;
    width: 400px;


    @media screen and (max-width: 900px) {
      max-width: 90vw;
    }

    .top-menu {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
      border-bottom: 1px solid #ccc;

      .button {
        padding: 0.5rem;
        margin: 0.5rem;
      }
    }

    .cart-summary {
      background: #fafafa;
      border-top: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      justify-content: space-between;


      .total-price {
        padding: 0.5rem;
        margin: 0.5rem;
        font-weight: 600;

        .price-value {
          color: #5F5CFF;
          font-weight: 800;
        }
      }

      .button {
        padding: 0.5rem;
        margin: 0.5rem;
      }
    }

  }

  .shopping-cart-list {
    list-style: none;
    padding: 0.5rem;
    max-height: 50vh;
    overflow-y: scroll;
    width: auto;
    /* overflow-x: auto; */

    .shopping-cart-list-item {
      margin: 0.25rem 0;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1rem;
      display: flex;
      flex-direction: row;
      /* flex-wrap: wrap; */
      align-items: center;
      width: 100%;

      .remove-button {
        color: #ccc;
        font-size: 1rem;
        margin-top: -2rem;
        border-radius: 50%;
        padding: 0.25rem;
        line-height: 1;
        margin-left: 1rem;
        margin-right: -1rem;

        &:hover {
          color: #000;
          background: initial;
        }
      }

      .product-icon {
        margin-right: 0.5rem;
        font-size: 2rem;
        color:#5F5CFF;
      }

      .item-info-box {
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;

        .product-name {
          font-weight: 600;
          font-size: 1rem;
          line-height: 1;
          width: 100%;
        }
        .product-configuration {
          font-size: 0.7rem;
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


}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
