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

      <!-- Navigation Links Loop -->
      <li v-for="link in navigationLinks" :key="link.url" class="nav-item">
        <router-link :to="link.url" class="nav-link">
          <!-- <font-awesome-icon :icon="[ link.iconType, link.icon ]" :title="link.text" /> -->
          <span class="link-text">{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navigationLinks: [
        { url: "/", text: "Home", icon: "home-lg", iconType: "fad" },
        { url: "/products", text: "Products", icon: "store", iconType: "fad" },
        { url: "/about", text: "About", icon: "info-circle", iconType: "fad" },
        { url: "/account", text: "My account", icon: "user-alt", iconType: "fad" },
        { url: "/login", text: "Log in", icon: "home-lg", iconType: "fad" },
        { url: "/registration", text: "Registration", icon: "home-lg", iconType: "fad" },
        { url: "/cart", text: "Cart", icon: "shopping-cart", iconType: "fad" },
        { url: "/dashboard", text: "Dashboard", icon: "home-lg", iconType: "fad" },
        { url: "/admin", text: "Admin", icon: "home-lg", iconType: "fad" },
      ]
    }
  },
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
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2rem;

  .logo-link {
    text-decoration: none;
    color: #0f0f0f;
    font-weight: 1000;
    font-style: italic;
    text-shadow: -6px -3px 0px cyan;
    transition: text-shadow 100ms ease;
    border: 2px solid transparent;
    padding: 1rem 2rem;

    &:hover {
      color: #000;
      border: 2px dashed cyan;
      text-shadow: -6px -6px 0px orangered;
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
    color: #FF055F;
  }

  &:hover {
    filter: grayscale(50%) opacity(1);
  }
}

.nav-link {
  padding: 0.5rem 0.75rem;
  color: #5f5f5f;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 600;
  background: #f2f2f2;
  text-decoration: none;
  /* filter: grayscale(90%) opacity(0.7); */
  transition: 100ms;

  &:hover {
    filter: grayscale(0%) opacity(1);
    background: #e5e5e5;
    color: #555;
  }

  svg {
    margin-right: 5px;
  }
}

</style>
