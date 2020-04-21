<template>
  <nav class="simple-navbar">
    <ul class="simple-navbar-nav">
      <li class="logo">
        <router-link to="/" class="logo-link">
          <span class="link-text">
            eshop.blue
          </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/categories" class="nav-link">
          <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
          <span class="link-text">Products</span>
        </router-link>
      </li>


      <li class="nav-item">
        <router-link to="/pricing" class="nav-link">
          <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
          <span class="link-text">Pricing</span>
        </router-link>
      </li>

      <li class="nav-separator"><!-- separator --></li>

      <li v-if="!userData.email" class="nav-item">
        <router-link to="/login" class="nav-link">
          <span class="link-text">Log in</span>
        </router-link>
      </li>

      <li v-if="!userData.email" class="nav-item">
        <router-link to="/register" class="nav-link">
          <span class="link-text">Sign up</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item">
        <router-link to="/cart" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Cart" />
          <span class="link-text">Cart</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item">
        <router-link to="/orders" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Orders" />
          <span class="link-text">My orders</span>
        </router-link>
      </li>


      <li v-if="userData.email" class="nav-item">
        <router-link to="/account" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'user-alt' ]" title="Account" />
          <span class="link-text">{{ userData.email }}</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item">
        <logout-button class="nav-link"/>
      </li>

    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import navigationLinks from '../router/navigationLinks'
import LogoutButton from './LogoutButton'

export default {
  data() {
    return {
      navigationLinks: navigationLinks,
    }
  },

  computed: {
    ...mapState({
      userData: state => state.user.userData,
    }),
  },

  components: {
    LogoutButton
  }
}
</script>

<style lang="scss" scoped>

.simple-navbar {
  width: 100%;
  top: 0;
  height: 50px;
  background: #5F5CFF;
  /* background-image: linear-gradient(to right, #4facfe 0%, #5F5CFF 100%); */
  color: #fff;
}

.simple-navbar-nav {
  max-width: 90vw;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  /* margin-right: auto; */
  margin-left: 2rem;

  .logo-link {
    text-decoration: none;
    color: #fff;
    font-weight: 800;
    font-style: italic;
    /* text-shadow: -6px -3px 0px; */
    transition: text-shadow 100ms ease;
    border: 2px solid transparent;
    padding: 0.5rem 1rem;

    &:hover {
      color: #fff;
      border: 2px dashed palegreen;
      text-shadow: -6px -6px 0px rgb(184, 184, 184);
    }
  }
}

.nav-item {
  height: 100%;
  /* margin-right: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav-separator {
  margin-right: auto;
}

// Currently active route in vue router
.nav-item .nav-link.router-link-exact-active {

  /* filter: grayscale(35%) opacity(1); */

  .link-text {
    color: #21D4FD;
  }

  &:hover {
    background:rgb(62, 58, 255);
    /* filter: grayscale(50%) opacity(1); */
  }
}

.nav-link {
  display: flex;
  align-items:center;
  height: 100%;
  color: #fff;
  font-size: 1rem;
  padding: 0 2rem;
  font-weight: 600;
  background: transparent;
  text-decoration: none;
  transition: 100ms;

  &:hover {
    background:rgb(62, 58, 255);
  }

  svg {
    margin-right: 5px;
  }
}

</style>
