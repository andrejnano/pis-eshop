<template>
  <div class="products-page">

    <div class="featured-panel">
      <div class="title">Choose from pre-set VPS images</div>
      <div class="subtitle">Linux distributions, gaming servers and much more</div>


      <ul class="products">
        <li class="product-item" v-for="product in products" :key="product._id">
          <button title="Learn more about this service" class="product" @click="onClickCategory(product._id)">
            <div class="cover">
              <font-awesome-icon :icon="[ 'fad', product.icon ]" :title="product.title" />
              <div class="main-title">{{ product.title }}</div>
              <div class="sub-title">{{ product.subtitle }}</div>
            </div>
            <div class="description">{{ product.description }}</div>
            <div class="top-info">

              <div class="starting-price">
                <div class="label">Starting from:</div>
                <div class="price">{{ product.startingPrice }}€/month</div>
              </div>
            </div>
            <div class="cta">View all options -> </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        products: []
      }
    },

    created() {
      axios.get('http://localhost:4000/api/categories')
        .then(response => {
          this.products = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    methods: {
      onClickCategory(id) {
        this.$router.push({
          name: 'Products',
          params: {
            category_id: id
          }
        });
      }
    }

  }

</script>


<style lang="scss" scoped>
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

          &:hover {
            .cta {
              color: #666;
            }

            .cover {
              filter: grayscale(50%);
            }
          }

          .cover {
            background: #5F5CFF;
            background: radial-gradient(circle, rgba(33, 212, 253, 0.5) 0%, rgba(95,92,255,1) 90%);
            background: radial-gradient(circle, rgba(95,92,255,1) 0%, rgba(33, 212, 253, 0.9) 200%);
            /* background: rgb(33, 212, 253); */
            transition: filter 200ms ease;
            /* #21D4FD;rgb(62, 58, 255); */

            width: 100%;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 3rem;

            .main-title {
              line-height: 1;
              font-size: 1.4rem;
              font-weight: 600;
              line-height: 2;
              text-align: center;
            }

            .sub-title {
              font-size: 1rem;
              font-weight: 500;
              line-height: 1;
              color: rgb(227, 227, 227);
              text-align: center;
            }
          }


          .description {
              border-top: 1px solid #ccc;
              padding: 2rem 2rem;
              text-align: left;
              font-weight: 500;
              font-size: 0.9rem;
              text-align: left;
              height: 50px;
              color: #666;
              text-overflow: ellipsis;
              /* white-space: nowrap;
              overflow: hidden; */
            }


            .starting-price {
              width: 100%;
              display: flex;
              flex-direction: row;
              /* justify-content: center; */
              padding: 1rem 0;
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
              font-size: 0.8rem;
              padding: 1.5rem 2rem;
              color:rgba(33, 212, 253,1);
              font-weight: 500;
              background-color: #fff;
              display: flex;

              /* border: 2px solid transparent; */
              transition: color 200ms ease;
            }


        }
      }
    }

  }

</style>
