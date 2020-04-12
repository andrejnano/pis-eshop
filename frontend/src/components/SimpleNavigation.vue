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
import navigationLinks from '../router/navigationLinks'

export default {
  data() {
    return {
      navigationLinks: navigationLinks
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
