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
        <li class="order-item" v-for="order in orders" :key="order._id">
          <div class="order" v-bind:class="{ opacity: order.state!=='active' }">
            <div class="cover">
              <span class="order-id">#{{order._id}}</span>
              <time class="order-date">{{ new Date(order.date).toUTCString() }}</time>
              <div class="order-user" v-if="userData.isAdmin" >Customer: <span class="user">{{order.user.email}}</span></div>
              <div class="order-status">Status:
                <span class="status" v-bind:class="{
                  'status-active': order.state === 'active',
                  'status-created': order.state === 'created',
                  'status-expired': order.state === 'expired',
                  'status-cancelled': order.state === 'cancelled',
                }">{{ order.state }}</span>
              </div>
            </div>

            <div class="product-description" v-for="product in order.products" :key="product._id">
              <div class="product-name">{{ product.name }}</div>
              <div class="configuration-label">Configuration Details</div>
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
                  <label>Type:</label>
                  <span>{{ product.configuration.hddType }}</span>
                </li>
                <li>
                  <label>IPs:</label>
                  <span>
                    <template v-for="(ip, index) in generateIps(product.configuration.ipCount)">
                      <a :key="index" :href="ip">{{ip}}</a><br :key="ip">
                    </template>
                  </span>
                </li>
              </ul>
              <div class="price-box">
                <label class="label">Price:</label>
                <span class="price">{{ product.price  }}€/month</span>
              </div>
            </div>

            <footer class="order-footer">
              <div class="total-order-price">
                <label class="label">Total order price:</label>
                <span class="price">{{ order.price }}€/month</span>
              </div>
              <div class="cta-buttons" v-if="!userData.isAdmin">
                <button class="pay" v-if="order.state!=='cancelled'" @click="actionOrder(order._id, 'pay')">
                  <font-awesome-icon :icon="[ 'fad', 'credit-card' ]" /> PAY
                </button>
                <button class="cancel" v-if="order.state!=='cancelled'" @click="actionOrder(order._id, 'cancel')">
                  <font-awesome-icon :icon="[ 'fad', 'window-close' ]" /> CANCEL
                </button>
                <button class="reorder" @click="reorder(order)">
                  <font-awesome-icon :icon="[ 'fad', 'redo' ]" /> REORDER
                </button>
              </div>
            </footer>
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
              user-select: all;
              background: #000;
              color: #fff;
              padding: 0 0.4rem;
            }

            .order-status {
              width: 100%;
              color: rgb(227, 227, 227);
              font-size: 1rem;
              font-weight: 500;
              .status {
                font-size: 0.9rem;
                font-weight: 800;
                text-transform: uppercase;
                color: #fff;
                padding: 0 0.4rem;
              }

              .status-active {
                background-color: rgb(0, 210, 0);
              }
              .status-created {
                background-color: rgb(255, 0, 195);
              }
              .status-expired {
                background-color: rgb(255, 125, 0);
              }
              .status-cancelled {
                background-color: rgb(193, 27, 27);
              }
            }

            .order-user {
              width: 100%;
              color: rgb(227, 227, 227);
              font-size: 1rem;
              font-weight: 500;

              .user {
                font-weight: 600;
                color: #000;
                background: #fff;
                user-select: all;
                padding: 0 0.4rem;
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

          .product-description {
            border-bottom: 1px solid #ccc;
            padding: 1rem 2rem;

            .product-name {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0.75rem 0;
              /* background: #eee; */

              display: inline-block;
            }

            .configuration-label {
              color: #666;
              font-size: 1rem;
              margin-bottom: 0.5rem;
            }

            .configuration {
              display: flex;
              flex-direction: column;

              li {
                display: flex;
                line-height: 1.5;

                label {
                  width: 60px;
                  text-align: right;
                  color: #666;
                  font-size: 1rem;
                  font-weight: 500;
                }
                span {
                  margin-left: 0.5rem;
                  font-size: 1rem;
                  font-weight: 600;


                  a {
                    text-decoration: none;
                    color:rgb(62, 58, 255);

                    &:hover {
                      opacity: 0.7;
                    }
                  }
                }
              }
            }
          }

          .order-footer {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .total-order-price {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              padding: 1rem 2rem;

              .label {
                font-size: 1.5rem;
                font-weight: 400;
                color: #666;
                text-align: left;
              }

              .price {
                font-size: 1.5rem;
                margin-left: 0.5rem;
                font-weight: 600;
                color: #000;
              }
            }

            .cta-buttons {
              margin-left: auto;
              display: flex;
              flex-direction: row;
              align-items: center;

              button {
                width: auto;
                font-size: 1rem;
                background: #ccc;
                color: #000;
                padding: 0.5rem 1rem;
                margin-right: 0.5rem;
                transition: 200ms background ease;
                text-align: center;
                white-space: nowrap;

                &.pay {
                  background:  rgb(88, 220, 88);
                  color: #000;
                }

                &.cancel {
                  background: rgb(254, 118, 118);
                }

                &.reorder {
                  background: rgba(89, 87, 174, 0.756);
                }
                &:hover {
                  background: #aaa;
                }

                svg {
                  margin-right: 0.2rem;
                  font-size: 1rem;
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
