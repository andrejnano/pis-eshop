<template>
  <div class="home">

    <div id='illustration-wrapper'>
      <img class="illustration" src="../assets/undraw_gaming_6oy3.svg" alt="server-cluster"/>
      <img class="illustration" src="../assets/undraw_secure_server.svg" alt="server-cluster"/>
      <img class="illustration" src="../assets/undraw_maintenance.svg" alt="server-cluster"/>
    </div>

    <div class="featured-panel">
      <div class="title">VPS Hosting Platform</div>
      <div class="subtitle">Servers for gaming, e-commerce and web app deployment.</div>
      <div class="subtitle-2">Built by developers for developers.</div>
      <div class="cta">
        <router-link v-if="!userData.email" to="/register" class="button primary-button">
          <span class="link-text">Sign up</span>
        </router-link>
        <router-link v-if="userData.email" to="/categories" class="button primary-button">
          <span class="link-text">View all VPS categories</span>
        </router-link>
        <router-link to="pricing" class="button secondary-button">
          <span class="link-text">View pricing</span>
        </router-link>
      </div>
    </div>

    <ShoppingCart/>

  </div>
</template>


<script>
import { mapState } from 'vuex'
import ShoppingCart from '../components/ShoppingCart'


export default {
  name: 'Home',
  components: {
    ShoppingCart,
  },

  computed: {
    ...mapState({
      userData: state => state.user.userData,
      }),
  }

}
</script>


<style lang="scss" scoped>


.home {
  background: rgba(240, 240, 240, 0.345);
}

  #illustration-wrapper {


    @media screen and (max-width: 900px) {
      position: initial;
      padding: 2rem 0;
      top: 50px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .illustration {
        width: 150px;
      }
    }

    @media screen and (min-width: 901px) {
      position: absolute;
      top: 100px;
      right: 200px;
      display: flex;
      flex-direction: column;

      .illustration {
        position: relative;
        width: 200px;
        margin: 1rem auto;

        &:last-child {
          /* margin; */
        }

        &:nth-child(2) {
          margin-left: 100px;
        }

        &:first-child {
          /* margin-top: 400px; */
        }
      }
    }

  }


  .featured-panel {
    width: 100%;
    background: transparent;
    z-index: 0;
    height: calc(100vh - 50px);

    @media screen and (max-width: 900px) {
      height: auto;
    }

    max-width: 90vw;
    margin: 0 auto;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .title {
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

    .cta {
      margin-top: 2rem;

        .primary-button, .secondary-button {
          text-decoration: none;
          padding: auto 2rem;
          transition: background-color 100ms linear;
          border-radius: 4px;
        }

        .primary-button {
          background-color: #5F5CFF;
          border: 1px solid #5F5CFF;
          color: #fff;

          &:hover {
            background-color: rgb(51, 47, 255);
          }
        }

        .secondary-button {
          color: #5F5CFF;
          margin-left: 1rem;
          border: 1px solid #5F5CFF;

          &:hover {
            border: 1px solid rgb(51, 47, 255);
            color: rgb(51, 47, 255);
          }
        }
    }
  }

</style>
