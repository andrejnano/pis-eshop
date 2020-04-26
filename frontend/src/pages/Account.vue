<template>
  <div class="account-page">
    <div class="product">
      <div class="cover">
        <font-awesome-icon :icon="[ 'fad', 'user-alt' ]" />
      </div>
      <div class="top-info">

        <div class="column">
          <div class="main-title">{{user.fullname}}</div>
        </div>
        <div class="column">
          <div class="label">Currently paying:</div>
          <div class="price">{{this.paying}}€/month</div>
        </div>
      </div>
      <div class="description">Email - <span class="violet">{{user.email}}</span></div>
      <div class="description">Password - <span class="violet">*******</span></div>


    </div>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        user: [],
        paying: 0
      }
    },

    created() {
      axios.get('http://localhost:4000/api/users')
        .then(response => {
          console.log(response.data)
          this.user = response.data.user
        })
        .catch(e => {
          console.log(e)
        });

      axios.get('http://localhost:4000/api/orders/')
        .then(response => {
          console.log(response.data)
          this.paying = response.data.filter(o => o.state === 'active').reduce((acc, next) => acc + next.price, 0);
        })
        .catch(e => {
          console.log(e)
        })

    },

    methods: {
      updateUser() {
        axios.get('http://localhost:4000/api/users')
          .then(response => {
            console.log(response.data)
            this.user = response.data.user
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }


  }

</script>


<style lang="scss" scoped>
  .product {

    margin: 5rem;
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
      font-size: 8rem;
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

    .violet {
      color: #5F5CFF;
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

</style>
