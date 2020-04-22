<template>
  <div class="products-page">

    <div class="featured-panel">
      <div class="title">Choose from pre-set VPS images</div>
      <div class="subtitle">{{description}}</div>


      <ul class="products three-column-grid">
        <li class="product-item" v-for="product in products" :key="product.title">
          <button class="product">     
            <button v-if="userData.isAdmin" @click="deleteProduct(product._id)" class="delete">
                <font-awesome-icon :icon="[ 'fad', 'trash' ]" />
            </button>

            <button v-if="userData.isAdmin" class="edit" @click="setSelectedProduct(product)">
                <font-awesome-icon :icon="[ 'fad', 'edit' ]" />
            </button>
            <div class="cover">

              <div class="configuration">
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
              <font-awesome-icon :icon="[ 'fad', 'server' ]" :title="product.title" />
            </div>
            <div class="top-info">

              <div class="column">
                <div class="main-title">{{ product.name }}</div>
              </div>
              <div class="column">
                <div class="label">Price:</div>
                <div class="price">{{ product.price }}€/month</div>
              </div>
            </div>
            <div class="description">{{ product.description }}</div>


          </button>
        </li>
      <button class="product dashed-border" v-if="userData.isAdmin" @click="addIsVisible = !addIsVisible; trueEditFalseCreate = false"> 
        Add product </button>
        <li></li>
      </ul>

<div class="shadow"  v-if="this.addIsVisible">
 <button class="edit-product" v-if="this.addIsVisible">   

   <button v-if="userData.isAdmin" class="delete" @click="addIsVisible = !addIsVisible">
        <font-awesome-icon :icon="[ 'fad', 'trash' ]" />
    </button>
    <div class="cover">

        <div class="configuration">
        <ul>
            <li>
            <label>RAM</label> 
            <select v-model="newProduct.memory">
              <option disabled value="">RAM</option>
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
              <option>64</option>
              <option>128</option>
            </select> GB
            </li>
            <li>
            <label>vCPU's</label>
            <select v-model="newProduct.cpu">
              <option disabled value="">vCPU's</option>
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </select>
            </li>
            <li>
            <label>HDD</label>
            <select v-model="newProduct.hdd">
              <option disabled value="">Hdd</option>
              <option>128</option>
              <option>256</option>
              <option>512</option>
              <option>1024</option>
            </select> GB
            </li>
            <li>
            <label>Type</label>
            <select v-model="newProduct.hddType">
              <option disabled value="">Hdd Type</option>
              <option>HDD</option>
              <option>SSD</option>
            </select>
            </li>
            <li>
            <label>IP's</label>
            <input v-model="newProduct.ipCount" placeholder="1 - 255">
            </li>
        </ul>
        </div>
            <font-awesome-icon :icon="[ 'fad', 'server' ]" />

    </div>
    <div class="top-info">

        <div class="column">
        <div class="main-title">
            <input class="name-input" v-model="newProduct.name" placeholder="Product name">
        </div>
        </div>
        <div class="column">
        <div class="label">Price:</div>
        <input  class="price-input" v-model="newProduct.price" placeholder="price">€/month
        </div>
    </div>
    <div class="description"><textarea v-model="newProduct.description" placeholder="New product description"  rows="4"></textarea></div>
    <div class="footer">
            <button  @click="createProduct()">
              TODO Icon
                <font-awesome-icon :icon="[ 'fad', 'plus' ]" />
            </button>  
    </div>
    </button>
</div>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      products: [],
      selected: {},
      description: '',
      addIsVisible: false,
      trueEditFalseCreate : false,
      newProduct: {
              memory: '',
              cpu: '',
              hdd: '',
              hddType: '',
              ipCount: '',
              name: '',
              price: '',
              description: '',
              _id: ''
      }
    }
  },

  components: {
  },

  created() {
    this.fetchProducts();
  },

  computed: {
    ...mapState({
      userData: state => state.user.userData,
      isAdmin: state => state.user.isAdmin
    }),
    
  },

  methods: {
    condition() {
      this.trueEditFalseCreate = false;
      return this.userData.isAdmin && this.addIsVisible;
    },
    fetchProducts() {
      axios.get('http://localhost:4000/api/categories/'+this.$route.params.category_id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.description = response.data.pop().description;
            this.products = response.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
    deleteProduct(product_id) {
      axios.delete('http://localhost:4000/api/products/'+product_id)
      .then(() => {
        this.fetchProducts();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    setSelectedProduct(product) {
      if(this.addIsVisible == false) this.addIsVisible = !this.addIsVisible;
      this.trueEditFalseCreate = true;
      this.selected = product;
      this.newProduct.memory = product.configuration.memory;
      this.newProduct.cpu = product.configuration.cpu;
      this.newProduct.hdd = product.configuration.hdd;
      this.newProduct.hddType = product.configuration.hddType;
      this.newProduct.ipCount = product.configuration.ipCount;
      this.newProduct.name = product.name;
      this.newProduct.price = product.price;
      this.newProduct.description = product.description;
      this.newProduct._id = product._id;
    },
    createProduct() {
      if (this.trueEditFalseCreate) {
              let product = {
                "name":  this.newProduct.name,
                "price":  this.newProduct.price,
                "icon": "server",
                "description": this.newProduct.description
            }
            axios.put('http://localhost:4000/api/products/'+ this.newProduct._id, product)
            .then(response => {
              console.log(response);
              this.fetchProducts();
              this.addIsVisible = !this.addIsVisible;
            })
            .catch(e => {
              this.errors.push(e)
            })
      }else {
            let product = {
                "name": this.newProduct.name,
                "configuration": {
                    "os": "Minecraft",
                    "memory": this.newProduct.memory,
                    "cpu": this.newProduct.cpu,
                    "hdd": this.newProduct.hdd,
                    "hddType": "HDD",
                    "ipCount": this.newProduct.ipCount,
                },
                "category": this.$route.params.category_id,
                "price": this.newProduct.price,
                "icon": "server",
                "description": this.newProduct.description
            }
            axios.post('http://localhost:4000/api/products/', product)
            .then(response => {
              console.log(response);
              this.fetchProducts();
              this.addIsVisible = !this.addIsVisible;
            })
            .catch(e => {
              this.errors.push(e)
            })
      }
    }
  }

}
</script>


<style lang="scss" scoped>

.dashed-border {
    border:5px dashed #bbbbbb !important;  
}


  .footer {
    background: #5F5CFF;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
  }

.products-page {
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

  .subtitle-2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 400;
    color: #666;
  }

  .products {
    margin: 4rem 0;

    .product-item {
      margin-right: 1rem;
      margin-bottom: 2rem;
      display: flex;

      .product {
        flex-grow: 100;
        padding: 0;
        background: #fff;
        /* box-shadow: 1px solid #ccc; */
        appearance: none;
        /* outline: none; */
        border: none;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        position: relative;


        .cover {
          background: #5F5CFF;
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: #fff;
          font-size: 3rem;
        }


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

        .configuration {
          text-align: left;
          display: table;
          width: 50%;

          li {
            list-style-type: circle;
            color: #fff;
            display: table-row;

            label {
              width: 50%;
              display: table-cell;
              font-weight: 400;
              font-size: 1rem;
            } 

            span {
              display: table-cell;
              font-weight: 600;
              font-size: 1.5rem;
            }
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
}

 .edit {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        z-index: 2;
        color: #fff;
      }

.delete {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1;
  color: #fff;
}

.shadow  {
 display: block; 
  position: fixed; 
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
   background-color: rgba(19, 19, 19, 0.767);
  z-index: 8;
}

.edit-product{
  display: block; 
  position: fixed; 
  top: 20%; 
  left: 20%;
  padding: 0;
  background: #fff;
  appearance: none;
  /* outline: none; */
  border: none;
  box-shadow: -26px -13px 62px 4px rgba(0,0,0,0.24);        
  width: 60%;
  z-index: 10;

  .cover {
    background: #5F5CFF;
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    font-size: 3rem;
  }

  .footer {
    background: #5F5CFF;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
  }


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

    input {
        display: table-cell;
        font-weight: 600;
        font-size: 1.5rem;
        border: none;
        width: 5rem;
        padding: 0;
        margin: 0;
        border-bottom: 2px solid #5F5CFF;
        color: #5F5CFF;
        background-color: transparent;
        margin-left: 3rem;
      }
      input::placeholder {
          color: #5F5CFF;
      }
  }

  .configuration {
    text-align: left;
    display: table;
    width: 70%;
    padding: 1rem;

    li {
      color: #fff;
      display: table-row;
      width: 100%;

      label {
        display: table-cell;
        font-weight: 400;
        font-size: 1rem;
      } 

      input {
        display: table-cell;
        font-weight: 600;
        font-size: 1.5rem;
        border: none;
        width: 12rem;
        padding: 0;
        margin: 0;
        border-bottom: 2px solid #fff;
        color: #fff;
        background-color: transparent;
        margin-left: 3rem;
      }
      input::placeholder {
          color: #ccc;
      }
    }
  }

  .description {
    border-top: 1px solid #ccc;
    padding: 2rem 2rem;
    text-align: left;
    font-weight: 400;
    color: #666;
  }

  textarea {
    border: solid 1px #5F5CFF;
        resize: vertical;
        width:100%

  }

  .name-input {
    width: 100% !important;
    font-size: 2rem !important;
  }

}
  


</style>
