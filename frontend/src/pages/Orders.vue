<template>
  <div class="orders-page">

    <div class="featured-panel">
      <div class="title">{{title}}</div>
      <div class="filters">
        <button @click="setFilter(null)">All orders</button>
        <button @click="setFilter('active')">Active orders</button>
        <button @click="setFilter('created')">New orders</button>
        <button @click="setFilter('expired')">Expired orders</button>
        <button @click="setFilter('cancelled')">Cancelled orders</button>
      </div>
      <ul class="orders">
        <li class="order-item" v-for="order in filteredOrders" :key="order._id">
          <div class="order" v-bind:class="{ opacity: order.state!=='active' }">
            <div class="cover">
              <span class="order-id">#{{order._id}}</span>
              <span v-if="userData.isAdmin" class="order-user"> {{order.user.fullname}} - {{order.user.email}}</span>
              <time class="order-date">{{ new Date(order.date).toUTCString() }}</time>
              <div class="order-status">Current status: <span class="status">{{ order.state }}</span></div>
            </div>

            <div class="product-description" v-for="product in order.products" :key="product._id">
              <div class="main-title">{{ product.name }}</div>
              <ul class="configuration">
                <li>
                  <label>RAM:</label>
                  <span>{{ product.configuration.memory }}GB</span>
                </li>
                <li>
                  <label>vCPUs:</label>
                  <span>{{ product.configuration.cpu }}</span>
                </li>
                <li>
                  <label>Storage:</label>
                  <span>{{ product.configuration.hdd }}GB</span>
                </li>
                <li>
                  <label>Storage type:</label>
                  <span>{{ product.configuration.hddType }}</span>
                </li>
                <li>
                  <label>IPs:</label>
                  <span>
                    <template v-for="(ip, index) in generateIps(product.configuration.ipCount)">
                      <a :key="index" :href="ip">{{ip}}</a><br :key="index">
                    </template>
                  </span>
                </li>
              </ul>
            </div>

            <div class="price-box">
              <label class="label">Order price:</label>
              <span class="price">{{ order.price }}€/month</span>
            </div>
            <div class="pay-buttons" v-if="!userData.isAdmin">
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

          </div>
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
        title: 'My orders',
        currentFilter: null,
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

      filteredOrders: function() {
        if (this.filter) {
          return this.orders.filter(function(order) {
            return order.state === this.filter;
          });
        } else {
          return this.orders;
        }
      }

    },
    methods: {

      setFilter: function(filter) {
        this.filter = filter;
      },

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
        let ips = []
        for (var i = 0; i < count; i++) {
          var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(
            Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
          ips.push(ip)
        }
        return ips;
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
      width: 100%;
      padding: 4rem 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .order-item {
        width: 100%;
        margin-bottom: 2rem;

        .order {
          width: 100%;
          background: #fff;
          box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);

          .cover {
            background: radial-gradient(circle, rgba(95,92,255,1) 0%, rgba(33, 212, 253, 0.9) 200%);
            /* background: rgb(33, 212, 253); */
            transition: filter 200ms ease;
            /* #21D4FD;rgb(62, 58, 255); */
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: center;
            color: #fff;
            padding: 2rem;

            .order-id {
              font-weight: 600;
              font-size: 1.25rem;
              margin-right: auto;
            }

            .order-status {
              width: 100%;
              color: rgb(227, 227, 227);
              font-size: 1rem;
              .status {
                font-weight: 600;
                color: #fff;
              }
            }

            .order-date {
              font-size: 1rem;
              font-weight: 600;
            }
          }

          .price-box {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 1rem 2rem;

            .label {
              font-size: 1rem;
              font-weight: 400;
              color: #666;
              text-align: left;
            }

            .price {
              font-size: 1rem;
              margin-left: 0.5rem;
              font-weight: 600;
              color: #000;
            }
          }

          .pay-buttons {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 1rem 2rem;

            button {
              font-size: 1rem;
              background: #ccc;
              color: #000;
            }
          }

          .product-description {
            padding: 1rem 2rem;
            .main-title {
              font-size: 1rem;
            }
            .configuration {
              display: flex;
              flex-direction: column;

              li {
                display: flex;
                label {
                  width: 120px;
                  text-align: right;
                }
                span {
                  margin-left: 0.5rem;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
    }

    .main-title {
      line-height: 2;
      font-size: 1.6rem;
      font-weight: 600;
      text-align: left;
    }
  }


  .filters {
    margin-top: 1rem;
  }

</style>
