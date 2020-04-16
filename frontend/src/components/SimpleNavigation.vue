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
        <router-link to="products" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" />
          <span class="link-text">Products</span>
        </router-link>
      </li>


      <li class="nav-item"><!-- separator --></li>
      <li class="nav-item"><!-- separator --></li>

      <li v-if="!userData.email" class="nav-item">
        <router-link to="login" class="nav-link">
          <span class="link-text">Log in</span>
        </router-link>
      </li>

      <li v-if="!userData.email" class="nav-item">
        <router-link to="register" class="nav-link">
          <span class="link-text">Sign up</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item">
        <router-link to="cart" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Cart" />
          <span class="link-text">Cart</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item">
        <router-link to="orders" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Orders" />
          <span class="link-text">My orders</span>
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
  width: 100vw;
  top: 0;
  height: 100px;
}

.simple-navbar-nav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: auto;
  margin-left: 2rem;

  .logo-link {
    text-decoration: none;
    color: #0f0f0f;
    font-weight: 1000;
    font-style: italic;
    /* text-shadow: -6px -3px 0px; */
    transition: text-shadow 100ms ease;
    border: 2px solid transparent;
    padding: 1rem 2rem;

    &:hover {
      color: #000;
      border: 2px dashed cyan;
      text-shadow: -6px -6px 0px cyan;
    }
  }
}

.nav-item {
  margin-right: 1rem;
}

// Currently active route in vue router
.nav-item .nav-link.router-link-exact-active {

  /* filter: grayscale(35%) opacity(1); */

  .link-text {
    color: #21D4FD;
  }

  &:hover {
    color: #B721FF;
    /* filter: grayscale(50%) opacity(1); */
  }
}

.nav-link {
  padding: 0.5rem 0.75rem;
  color: #5f5f5f;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 600;
  background: #f3f3f3;
  text-decoration: none;
  /* filter: grayscale(90%) opacity(0.7); */
  transition: 100ms;

  &:hover {
    /* filter: grayscale(0%) opacity(1); */
    background: #e5e5e5;
    color: #B721FF;
  }

  svg {
    margin-right: 5px;
  }
}

</style>
