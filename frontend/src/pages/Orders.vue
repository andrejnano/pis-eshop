<template>
  <div class="orders-page">

    <div class="featured-panel">
      <div class="title">My orders</div>

      <ul class="orders three-column-grid">
        <li class="order-item" v-for="order in orders" :key="order.title">
          <button class="order">
                <div class="label">Total price:</div>
                <div class="price">{{ order.price }}€/month</div>
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
                    <span>{{ product.configuration.ipCount }}</span>
                  </li>
                </ul>
            </div>
            <div class="description">Current status: <span class="violet">{{ order.state }}</span> <br>
            <button  @click="actionOrder(order._id, 'pay')">
                PAY
              </button>
              <button  @click="cancelOrder(order._id, 'cancel')">
                CANCEL
              </button>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      orders:[
    {
        "payment": "PayPal",
        "state": "created",
        "_id": "5ea0a01072298502608b7ecc",
        "price": 123,
        "user": {
            "_id": "5ea09fde72298502608b7ecb",
            "email": "testmail@test.cz"
        },
        "products": [{
            "_id": "5ea08272170714020dccdcef",
            "name": "Apache lite",
            "configuration": {
                "os": "CentOS",
                "memory": 4,
                "cpu": 2,
                "hdd": 512,
                "hddType": "HDD",
                "_id": "5ea08272170714020dccdce9",
                "ipCount": 2,
                "__v": 0
            },
            "category": "5ea08272170714020dccdcdf",
            "price": 70,
            "icon": "server",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
            "__v": 0
        },
        {
            "_id": "5ea08272170714rqwr020dccdcef",
            "name": "Apache Pro 2",
            "configuration": {
                "os": "CentOS",
                "memory": 4,
                "cpu": 2,
                "hdd": 512,
                "hddType": "HDD",
                "_id": "5ea08272170714fer020dccdce9",
                "ipCount": 2,
                "__v": 0
            },
            "category": "5ea08272170fsaf714020dccdcdf",
            "price": 70,
            "icon": "server",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
            "__v": 0
        }],
        "date": "2020-04-22T19:50:40.351Z",
        "__v": 0
    }
]
    }
  },


  created() {
    axios.get('http://localhost:4000/api/orders/')
    .then(response => {
      console.log(response.data)
      // this.orders = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    actionOrder(order_id, action) {
      axios.get('http://localhost:4000/api/orders/'+order_id+'/'+action)
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

        padding: 0;
        background: #fff;
        /* box-shadow: 1px solid #ccc; */
        appearance: none;
        /* outline: none; */
        border: none;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);


        .top-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 2rem 2rem;

          .column {
            width: 50%;
          }

          .main-title {
            line-height: 2;
            font-size: 1.6rem;
            font-weight: 600;
            text-align: left;
          }

          .sub-title {
            font-size: 1rem;
            font-weight: 600;
            color: #666;
            text-align: left;
          }

          .label {
            font-size: 1rem;
            font-weight: 500;
            color: #666;
            text-align: right;
            margin: 0.5rem;
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
}
</style>
