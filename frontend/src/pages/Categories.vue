<template>
  <div class="products-page">

    <div class="featured-panel">
      <div class="title">Choose from pre-set VPS images</div>
      <div class="subtitle">Linux distributions, gaming servers and much more</div>


      <ul class="products three-column-grid">
        <li class="product-item" v-for="product in products" :key="product.title">
          <button class="product" @click="onClickCategory(product._id)">
            <div class="cover">
              <font-awesome-icon :icon="[ 'fad', product.icon ]" :title="product.title" />
            </div>
            <div class="top-info">

              <div class="column">
                <div class="main-title">{{ product.title }}</div>
                <div class="sub-title">{{ product.subtitle }}</div>
              </div>
              <div class="column">
                <div class="label">Starting from:</div>
                <div class="price">{{ product.startingPrice }}€/month</div>
              </div>
            </div>
            <div class="description">{{ product.description }}</div>
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

        .product {
          width: 100%;
          padding: 0;
          background: #fff;
          /* box-shadow: 1px solid #ccc; */
          appearance: none;
          /* outline: none; */
          border: none;
          box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);


          .cover {
            background: #5F5CFF;
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: center;
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

</style>
