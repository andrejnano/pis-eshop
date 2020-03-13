<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <router-link to="/" class="nav-link">
          <span class="link-text">
            <font-awesome-icon :icon="['fad', 'lambda']" />
            Eshop
          </span>
          <font-awesome-icon :icon="['fad', 'angle-double-right']" class="rotation-icon" title="Home" />
        </router-link>
      </li>

      <!-- Navigation Links Loop -->
      <li v-for="link in navigationLinks" :key="link.url" class="nav-item">
        <router-link :to="link.url" class="nav-link">
          <font-awesome-icon :icon="[ link.iconType, link.icon ]" :title="link.text" />
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
        { url: "/cart", text: "Cart", icon: "shopping-cart", iconType: "fad" },
        { url: "/account", text: "Home", icon: "home-lg", iconType: "fad" },
        { url: "/login", text: "Log in", icon: "home-lg", iconType: "fad" },
        { url: "/registration", text: "Registration", icon: "home-lg", iconType: "fad" },
        { url: "/dashboard", text: "Dashboard", icon: "home-lg", iconType: "fad" },
        { url: "/admin", text: "Admin", icon: "home-lg", iconType: "fad" },
      ]
    }
  }
};
</script>

<style lang="scss" scoped>

$cl1: rgba(242,4,202, 1);
$cl2: rgba(123,4,242, 1);
$cl3: rgba(97,3,191, 1);
$cl4: rgba(4,1,89, 1);
$cl5: #f23726;

$transition-speed: 100ms;
$text-primary: #555;
$text-secondary: #222;
$bg-primary: #e5e5e5;
$bg-secondary: #efefef;

$fa-primary-color: $cl5;
$fa-secondary-color: #FF055F;

$navbar-size-closed: 5rem;
$navbar-size-open: 16rem;

.navbar {
  z-index: 10;
  position: fixed;
  background-color: $bg-primary;
  transition: width 200ms linear;
  box-shadow: 3px 0px 10px 0px rgba(0,0,0,0.5);
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-item {
  width: 100%;
}

.nav-item:last-child {
  margin-top: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  height: $navbar-size-closed;
  color: $text-secondary;
  text-decoration: none;
  filter: grayscale(99%) opacity(1);
  transition: $transition-speed;
}

.nav-link:hover {
  filter: grayscale(0%) opacity(1);
  background: $bg-secondary;
  color: $text-secondary;
}

// Currently active route in vue router
.nav-item .nav-link.router-link-exact-active {

  filter: grayscale(35%) opacity(1);

  .link-text {
    color: #FF055F;
  }

  &:hover {
    filter: grayscale(0%) opacity(1);
  }
}

.link-text {
  font-weight: 500;
  display: none;
  margin-left: 1rem;
}

.nav-link svg {
  width: 2rem;
  min-width: 2rem;
  margin: 0 1.5rem;
  font-size: 2rem;
  transform:translate3d(0,0,0);
}

.fa-primary {
  color: $fa-primary-color;
}

.fa-secondary {
  color: $fa-secondary-color;
}

.fa-primary,
.fa-secondary {
  transition: $transition-speed;
}

.logo {
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: $text-secondary;
  background: $bg-secondary;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.3ch;
  width: 100%;
}

.logo .link-text {
  margin-left: 2rem;
  font-weight: 700;
}

.logo svg:not(.rotation-icon) {
  width: initial;
  min-width: initial;
  margin: auto;
  font-size: 1.5rem;
}

.logo svg.rotation-icon {
  transform: rotate(0deg);
  transition: transform $transition-speed
}

.navbar:hover .logo svg.rotation-icon {
  transform: rotate(-180deg);
}

/* Small screens */
@media only screen and (max-width: 600px) {
  .navbar {
    bottom: 0;
    width: 100vw;
    height: $navbar-size-closed;
  }

  .logo {
    display: none;
  }

  .navbar-nav {
    flex-direction: row;
  }

  .nav-link {
    justify-content: center;
  }

}

/* Large screens */
@media only screen and (min-width: 600px) {
  .navbar {
    top: 0;
    width: $navbar-size-closed;
    height: 100vh;
  }

  .navbar:hover {
    width: $navbar-size-open;
  }


  .navbar:hover .link-text {
    display: inline;
    white-space:nowrap;
  }
}
</style>
