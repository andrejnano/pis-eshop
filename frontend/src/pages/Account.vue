<template>
    <div class="account-page">
    <h1>This is an account page</h1>
    <p>{{user.email}}</p>
    <button class="product" @click="updateUser()">Update email to super@super.com --not implemented, just testing</button>
    <p>Projected of a the a descriptions, which client is editorials of in now you himself of ago discipline's on. Derided moving advised motivator, clean facilitate for was to where about was who the in talking I target. Experience to shown of one weary would series epic partiality support example, title desk small the boundless to I our sad. Origin; An and who minutes. To occasion when sign of you they room. Subjective fur that travelling, his he way countries time attention they of frequency lay present trumpet touch more it at hearing. Typically of entered a I travelling read stand.</p>
  </div>
</template>


<script>

import axios from 'axios';

export default {
  data() {
    return {
      user: []
    }
  },

  created() {
    axios.get('http://localhost:4000/api/users')
    .then(response => {
      console.log(response.data)
      this.user = response.data.user
    })
    .catch(e => {
      this.errors.push(e)
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

        padding: 0;
        background: #fff;
        /* box-shadow: 1px solid #ccc; */
        appearance: none;
        /* outline: none; */
        border: none;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);


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
