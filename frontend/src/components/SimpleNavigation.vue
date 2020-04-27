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

      <li class="nav-item desktop-visible">
        <router-link to="/categories" class="nav-link">
          <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
          <span class="link-text">Products</span>
        </router-link>
      </li>


      <li class="nav-item desktop-visible">
        <router-link to="/pricing" class="nav-link">
          <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
          <span class="link-text">Pricing</span>
        </router-link>
      </li>

      <li class="nav-separator"><!-- separator --></li>

      <li v-if="!userData.email" class="nav-item desktop-visible">
        <router-link to="/login" class="nav-link">
          <span class="link-text">Log in</span>
        </router-link>
      </li>

      <li v-if="!userData.email" class="nav-item desktop-visible">
        <router-link to="/register" class="nav-link">
          <span class="link-text">Sign up</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item desktop-visible">
        <router-link to="/cart" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Cart" />
          <span class="link-text">Cart</span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item desktop-visible">
        <router-link to="/orders" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Orders" />
          <span class="link-text">Orders</span>
        </router-link>
      </li>


      <li v-if="userData.email" class="nav-item desktop-visible">
        <router-link to="/account" class="nav-link">
          <font-awesome-icon :icon="[ 'fad', 'user-alt' ]" title="Account" />
          <span class="link-text">
            {{ userData.email }}
            <span v-if="userData.isAdmin">[ADMIN]</span>
          </span>
        </router-link>
      </li>

      <li v-if="userData.email" class="nav-item desktop-visible">
        <logout-button class="nav-link"/>
      </li>

      <li class="nav-item mobile-only-visible">
        <button class="toggle-mobile-button" @click="mobileMenuVisible = !mobileMenuVisible">
          <font-awesome-icon :icon="[ 'fad', 'bars' ]" />
        </button>
      </li>

      <div class="mobile-only-visible">
        <nav class="mobile-nav" v-if="mobileMenuVisible">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <router-link to="/categories" class="mobile-nav-link">
                <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
                <span class="link-text">Products</span>
              </router-link>
            </li>

            <li class="mobile-nav-item ">
              <router-link to="/pricing" class="mobile-nav-link">
                <!-- <font-awesome-icon :icon="[ 'fad', 'store' ]" title="Products" /> -->
                <span class="link-text">Pricing</span>
              </router-link>
            </li>

            <li v-if="userData.email" class="mobile-nav-item">
              <router-link to="/cart" class="mobile-nav-link">
                <!-- <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Cart" /> -->
                <span class="link-text">Cart</span>
              </router-link>
            </li>

            <li v-if="userData.email" class="mobile-nav-item">
              <router-link to="/orders" class="mobile-nav-link">
                <!-- <font-awesome-icon :icon="[ 'fad', 'shopping-cart' ]" title="Orders" /> -->
                <span class="link-text">Orders</span>
              </router-link>
            </li>
          </ul>


          <div class="acc-box">
            <router-link v-if="userData.email" to="/account" class="mobile-nav-link">
                <font-awesome-icon :icon="[ 'fad', 'user-alt' ]" title="Account" />
                <span class="link-text">
                  {{ userData.email }}
                  <span v-if="userData.isAdmin">[ADMIN]</span>
                </span>
              </router-link>
          </div>

          <div class="acc-buttons">
            <router-link v-if="!userData.email" to="/login" class="button">
              <span class="link-text">Log in</span>
            </router-link>

            <router-link v-if="!userData.email" to="/register" class="button">
              <span class="link-text">Sign up</span>
            </router-link>

            <logout-button v-if="userData.email" class="button"/>
          </div>
        </nav>

      </div>

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
      mobileMenuVisible: false,
    }
  },

  computed: {
    ...mapState({
      userData: state => state.user.userData,
      isAdmin: state => state.user.isAdmin
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


  @media screen and (max-width: 900px) {
    position: fixed;
    z-index: 50;

    box-shadow: 0px 1px 3px 3px rgba(0,0,0,0.2);
  }
}

.mobile-nav {
  background: #4facfe;
  color: #fff;
  z-index: 99;
  position: fixed;
  top: 50px;
  left: 5vw;
  width: 90vw;
  display: flex;
  height: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .mobile-nav-list {
    display: flex;
    flex-direction: column;
    width: 75%;
    padding: 4rem 2rem;

    .mobile-nav-item {
      margin-top: 1rem;

      .mobile-nav-link {
        text-decoration: none;
        color: #fff;
        font-weight: 600;
        font-size: 2rem;

        .link-text {

        }
      }
    }
  }

  .acc-box {
    font-size: 1rem;
    a { text-decoration: none; }
    font-weight: bold;
  }

  .acc-buttons {
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .button {
      font-size: 1.5rem;
      padding: 1rem 3rem;
      color: #fff;
      justify-self: stretch;
      border-radius: 3px;
      background: #5F5CFF;
    }
  }

}


.toggle-mobile-button {
  font-size: 2rem;
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

  .desktop-visible {
    display: none;
  }

  .mobile-only-visible {
    display: block;
  }

  @media screen and (min-width: 900px) {

    .desktop-visible {
      display: block;
    }

    .mobile-only-visible {
      display: none;
    }

  }
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
  white-space: nowrap;

  &:hover {
    background:rgb(62, 58, 255);
  }

  svg {
    margin-right: 5px;
  }
}

</style>
