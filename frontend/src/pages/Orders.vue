<template>
  <div class="orders-page">

    <div class="featured-panel">
      <div class="title">{{title}}</div>

      <ul class="orders three-column-grid">
        <li class="order-item" v-for="order in orders" :key="order.title">
          <button class="order" v-bind:class="{ opacity: order.state!=='active' }">
            <div class="violet" v-if="!userData.isAdmin">{{ order.price }}€/month</div>
            <div v-if="!userData.isAdmin">
              <button v-if="order.state!=='cancelled'" @click="actionOrder(order._id, 'pay')">
                PAY
              </button>
              <button v-if="order.state!=='cancelled'" @click="actionOrder(order._id, 'cancel')">
                CANCEL
              </button>

              <button @click="reorder(order)">
                REORDER
              </button>
            </div>
            <span v-if="userData.isAdmin" class="violet"> {{order.user.fullname}} - {{order.user.email}}</span>
            <br>
            Current status: <span class="violet">{{ order.state }}</span> <br>
            {{ new Date(order.date).toUTCString() }}<br>
            <div class="violet" v-if="userData.isAdmin">{{ order.price }}€/month</div>

            <div class="description" v-for="product in order.products" :key="product._id">
              <div class="main-title">{{ product.name }}</div>
              <ul>
                <li>
                  <label>RAM</label>
                  <span>{{ product.configuration.memory }} GB</span>
                </li>
                <li>
                  <label>vCPU's</label>
                  <span>{{ product.configuration.cpu }}</span>
                </li>
                <li>
                  <label>HDD</label>
                  <span>{{ product.configuration.hdd }} GB</span>
                </li>
                <li>
                  <label>Type</label>
                  <span>{{ product.configuration.hddType }}</span>
                </li>
                <li>
                  <label>IP's</label>
                  <span>{{ generateIps(product.configuration.ipCount) }}</span>
                </li>
              </ul>
            </div>

          </button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        orders: [],
        title: 'My orders'
      }
    },

    created() {
      if (this.userData.isAdmin) this.title = "All orders";
      this.fetchProducts();
    },
    computed: {
      ...mapState({
        userData: state => state.user.userData,
        isAdmin: state => state.user.isAdmin
      }),

    },
    methods: {
      actionOrder(order_id, action) {
        axios.get('http://localhost:4000/api/orders/' + order_id + '/' + action)
          .then(() => {
            this.fetchProducts();
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      generateIps(count) {
        var text = ""
        for (var i = 0; i < count; i++) {
          var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(
            Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
          text += ", " + ip;
        }
        return text;
      },
      fetchProducts() {
        var url = '';
        if (this.userData.isAdmin) {
          url = 'all';
        }
        axios.get('http://localhost:4000/api/orders/' + url)
          .then(response => {
            console.log(response.data)
            // this.orders = [...response.data, ...this.orders]
            this.orders = response.data
          })
          .catch(e => {
            console.log(e)
          })
      },
      reorder(order) {
        let o = {
          "payment": order.payment,
          "price": order.price,
          "products": order.products.map(a => a._id)
        }
        console.log(o)
        axios.post('http://localhost:4000/api/orders', o)
          .then(() => {
            this.fetchProducts();
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
    }

  }

</script>


<style lang="scss" scoped>
  .orders-page {
    background: rgb(247, 247, 255);
  }

  .three-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

  .featured-panel {
    width: 100%;
    background: rgb(247, 247, 255);

    min-height: calc(100vh - 50px);
    max-width: 90vw;
    margin: 0 auto;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .title {
      margin-top: 4rem;
      font-size: 2.2rem;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 600;
      color: #5F5CFF;
    }

    .orders {

      margin: 4rem 0;

      .order-item {
        margin-right: 1rem;
        margin-bottom: 2rem;

        .order {
          width: 100%;
          padding: 2rem;
          background: #fff;
          /* box-shadow: 1px solid #ccc; */
          appearance: none;
          /* outline: none; */
          border: none;
          box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);


          .top-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 2rem 2rem;

            .column {
              width: 50%;
            }



            .sub-title {
              font-size: 1rem;
              font-weight: 600;
              color: #666;
              text-align: left;
            }



            .price {
              font-size: 1.4rem;
              font-weight: 600;
              text-align: right;
              color: #5F5CFF;

            }
          }


          .description {
            border-top: 1px solid #ccc;
            padding: 2rem 2rem;
            text-align: left;
            font-weight: 400;
            color: #666;
          }

        }
      }
    }

    .violet {
      color: #5F5CFF;
      font-size: 1.4rem;
      font-weight: 600;
    }

    label {
      font-size: 1rem;
      font-weight: 500;
      color: #5F5CFF;
      text-align: right;
      margin: 1.5rem;
    }

    .main-title {
      line-height: 2;
      font-size: 1.6rem;
      font-weight: 600;
      text-align: left;
    }

    .opacity {
      opacity: 0.5;
    }
  }

</style>
