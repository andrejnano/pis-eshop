<template>
  <div class="products-page">

    <div class="featured-panel">
      <div class="title">Choose from pre-set VPS images</div>
      <div class="subtitle">{{description}}</div>

      <div class="go-back">
        <router-link to="/categories">Go back to all categories</router-link>
      </div>

      <ul class="products">
        <li class="product-item" v-for="product in products" :key="product._id">
          <div class="product">
            <button v-if="userData.isAdmin" @click="deleteProduct(product._id)" class="delete">
              <font-awesome-icon :icon="[ 'fad', 'trash-alt' ]" />
            </button>

            <button v-if="userData.isAdmin" class="edit" @click="setSelectedProduct(product)">
              <font-awesome-icon :icon="[ 'fad', 'edit' ]" />
            </button>
            <div class="cover">
              <font-awesome-icon :icon="[ 'fad', 'server' ]" :title="product.title" />
              <div class="main-title">{{ product.name }}</div>
              <ul class="configuration">
                <li>
                  <span>{{ product.configuration.memory }} GB</span>
                  <label>RAM</label>
                </li>
                <li>
                  <span>{{ product.configuration.cpu }}x</span>
                  <label>vCPU</label>
                </li>
                <li>
                    <span>{{ product.configuration.hdd }} GB</span>
                   <label>HDD</label>
                </li>
                <li>

                  <span>{{ product.configuration.hddType }}</span>
                  <label>Storage</label>
                </li>
                <li>
                  <span>{{ product.configuration.ipCount }}</span>
                  <label>IP's</label>
                </li>
              </ul>
            </div>
            <div class="description">{{ product.description }}</div>
            <div class="top-info">
              <div class="price-box">
                <div class="label">Price:</div>
                <div class="price">{{ product.price }}€/month</div>
              </div>
            </div>
            <button class="cta" @click="addProductToCart(product)">
              Add to cart <font-awesome-icon :icon="[ 'fad', 'cart-plus' ]"/>
            </button>
          </div>
        </li>
        <button class="product dashed-border" v-if="userData.isAdmin"
          @click="addIsVisible = !addIsVisible; trueEditFalseCreate = false">
          Add product </button>

        <button class="product dashed-border" v-if="!userData.isAdmin"
          @click="addIsVisible = !addIsVisible; trueEditFalseCreate = false">
          Create custom configuration</button>
        <li></li>
      </ul>

      <div class="shadow" v-if="this.addIsVisible">
        <button class="edit-product" v-if="this.addIsVisible">

          <button class="delete" @click="addIsVisible = !addIsVisible">
            <font-awesome-icon :icon="[ 'fad', 'times' ]" />
          </button>
          <div class="cover">

            <div class="configuration">
              <ul>
                <li>
                  <label>RAM</label>
                  <select v-model="newProduct.memory">
                    <option disabled value="">RAM</option>
                    <option>1</option>
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
            <font-awesome-icon :icon="[ 'fad', 'server' ]" class="bigicon" />

          </div>
          <div class="top-info">

            <div class="column">
              <div class="main-title">
                <input class="name-input" v-if="userData.isAdmin" v-model="newProduct.name" placeholder="Product name">
                <span v-if="!userData.isAdmin">{{userData.email + " WomboConfiguration"}}</span>
              </div>
            </div>
            <div class="column">
              <div class="label">Price:</div>
              <input class="price-input" v-if="userData.isAdmin" v-model="newProduct.price" placeholder="price">
              <span v-if="!userData.isAdmin">{{this.getPrice()}}</span>
              €/month
            </div>
          </div>
          <div class="description"><textarea v-model="newProduct.description" placeholder="New product description"
              rows="4"></textarea></div>
          <div class="footer">
            <button @click="createProduct()" class="addbutton">
              <font-awesome-icon :icon="[ 'fad', 'plus' ]" />
              Create
            </button>
          </div>
        </button>
      </div>

    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        products: [],
        selected: {},
        description: '',
        addIsVisible: false,
        trueEditFalseCreate: false,
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

    components: {},

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

      addProductToCart: function(product) {
        this.$store.dispatch('CART_ADD_PRODUCT', product);
      },

      getPrice() {
        console.log(this.userData.isAdmin)

        const prices = {
          memory: {
            1: 10,
            2: 10,
            4: 16,
            8: 35,
            16: 59,
            32: 120,
            64: 150,
            128: 198
          },
          cpu: {
            2: 10,
            4: 16,
            8: 35,
            16: 59,
            32: 120
          },
          hdd: {
            128: 10,
            256: 16,
            512: 35,
            1024: 59
          },
          hddType: {
            SSD: 1.5,
            HDD: 1
          },
          ip: 10
        }
        return prices.memory[this.newProduct.memory] + prices.cpu[this.newProduct.cpu] + prices.hdd[this.newProduct
          .hdd] * prices.hddType[this.newProduct.hddType] + prices.ip * this.newProduct.ipCount;
      },
      condition() {

        this.trueEditFalseCreate = false;
        return this.userData.isAdmin && this.addIsVisible;
      },
      fetchProducts() {
        axios.get('http://localhost:4000/api/categories/' + this.$route.params.category_id)
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
        axios.delete('http://localhost:4000/api/products/' + product_id)
          .then(() => {
            this.fetchProducts();
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      setSelectedProduct(product) {
        if (this.addIsVisible == false) this.addIsVisible = !this.addIsVisible;
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
        this.newProduct.config_id = product.configuration._id;
      },
      createProduct() {
        if (this.userData.isAdmin) {
          if (this.trueEditFalseCreate) {
            let product = {
              "name": this.newProduct.name,
              "configuration": {
                "_id": this.newProduct.config_id,
                "os": "Minecraft",
                "memory": this.newProduct.memory,
                "cpu": this.newProduct.cpu,
                "hdd": this.newProduct.hdd,
                "hddType": this.newProduct.hddType,
                "ipCount": this.newProduct.ipCount
              },
              "price": this.newProduct.price,
              "icon": "server",
              "description": this.newProduct.description
            }
            axios.put('http://localhost:4000/api/products/' + this.newProduct._id, product)
              .then(response => {
                console.log(response);
                this.fetchProducts();
                this.addIsVisible = !this.addIsVisible;
              })
              .catch(e => {
                this.errors.push(e)
              })
          } else {
            let product = {
              "name": this.newProduct.name,
              "configuration": {
                "os": "Minecraft",
                "memory": this.newProduct.memory,
                "cpu": this.newProduct.cpu,
                "hdd": this.newProduct.hdd,
                "hddType": this.newProduct.hddType,
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
        } else {
          let product = {
            "name": this.newProduct.name,
            "configuration": {
              "os": "Minecraft",
              "memory": this.newProduct.memory,
              "cpu": this.newProduct.cpu,
              "hdd": this.newProduct.hdd,
              "hddType": this.newProduct.hddType,
              "ipCount": this.newProduct.ipCount,
            },
            "category": this.$route.params.category_id,
            "price": this.newProduct.price,
            "icon": "server",
            "description": this.newProduct.description
          }
          console.log(product)
        }
      }
    }

  }

</script>


<style lang="scss" scoped>

  .dashed-border {
    border: 5px dashed #bbbbbb !important;
  }

  .go-back {
    margin-top: 2rem;
    > a {
      text-decoration: none;
      transition: opacity 100ms ease;
      &:hover {
        opacity: 0.7;
      }
    }
  }


  .products-page {
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

    .subtitle-2 {
      margin-top: 2rem;
      font-size: 1.5rem;
      font-weight: 400;
      color: #666;
    }

    .products {
      width: 100%;
      padding: 4rem 0;
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: auto;

      .product-item {
        margin-right: 1rem;
        margin-bottom: 2rem;

        .product {
          width: 100%;
          height: 100%;
          padding: 0;
          background: #fff;
          /* box-shadow: 1px solid #ccc; */
          appearance: none;
          /* outline: none; */
          border: none;
          box-shadow: 0 2px 3px rgba(10, 10, 10, .2), 0 0 2px 3px rgba(10, 10, 10, .1);

          .cover {
            /* background: radial-gradient(circle, rgba(33, 212, 253, 0.5) 0%, rgba(95,92,255,1) 70%); */
            background: rgb(95,92,255);
            width: 100%;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 3rem;

            .main-title {
              line-height: 2;
              font-size: 1.2rem;
              font-weight: 1000;
              text-align: left;
            }

            .configuration {

              li {
                font-size: 1rem;
                line-height: 1.2;
                display: flex;
                justify-content: center;
                color: rgb(227, 227, 227);

                label {
                  font-weight: 400;
                  margin-left: 0.25rem;
                }

                span {
                  text-align: right;
                  font-weight: 800;
                }
              }
            }
          }

          .description {
            display: none;
            border-top: 1px solid #ccc;
            padding: 2rem 2rem 0rem;
            text-align: left;
            font-weight: 500;
            font-size: 0.9rem;
            text-align: left;
            height: 50px;
            color: #666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .price-box {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 1.5rem 2rem 0rem;

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

          .cta {
            width: 100%;
            font-size: 1rem;
            padding: 1.5rem 1rem;
            color:rgba(33, 212, 253,1);
            font-weight: 600;
            background-color: #fff;
            display: flex;
            justify-content: center;
            border: 2px solid transparent;
            transition: color 200ms ease;

            &:hover {
              color: #5F5CFF;
            }

            > svg {
              margin: 0 0.5rem;
            }
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

  .shadow {
    display: block;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    background-color: rgba(19, 19, 19, 0.767);
    z-index: 8;
  }

  .edit-product {
    display: block;
    position: fixed;
    top: 20%;
    left: 20%;
    padding: 0;
    background: #fff;
    appearance: none;
    /* outline: none; */
    border: none;
    box-shadow: -26px -13px 62px 4px rgba(0, 0, 0, 0.24);
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




    .top-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2rem 2rem;

      .column {
        width: 80%;
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
        border-bottom: 1px solid #5F5CFF;
        color: #5F5CFF;
        background-color: transparent;
        margin-left: 3rem;
      }

    }

    .configuration {
      text-align: left;
      display: table;
      width: 70%;
      padding: 2rem;

      li {
        color: #fff;
        display: table-row;
        width: 100%;

        label {
          display: table-cell;
          font-weight: 400;
          font-size: 2rem;
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
      width: 100%
    }

    .name-input {
      width: 100% !important;
      font-size: 2rem !important;
    }

  }

  .footer {
    background: #5F5CFF;
    justify-content: space-evenly;
    align-items: center;
  }

  .addbutton {
    color: white;
    padding: 2rem;
    font-size: 4rem;
    margin: 0.5rem;
  }

  .bigicon {
    font-size: 9rem;
  }

</style>
