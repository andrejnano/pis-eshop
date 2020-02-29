<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <router-link to="/" class="nav-link">
          <span class="link-text">
            <!-- <font-awesome-icon :icon="['fad', 'lambda']" /> -->
            Eshop
          </span>
          <font-awesome-icon :icon="['fad', 'angle-double-right']" class="rotation-icon" title="Home" />
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <font-awesome-icon :icon="['fad', 'home-lg']" title="Home" />
          <span class="link-text">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link">
          <font-awesome-icon :icon="['fad', 'store']" title="Products" />
          <span class="link-text">Products</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">
          <font-awesome-icon :icon="['fad', 'info-circle']" title="About" />
          <span class="link-text">About</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/deals" class="nav-link">
          <font-awesome-icon :icon="['fad', 'sparkles']" title="Deals" />
          <span class="link-text">Deals</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cart" class="nav-link">
          <font-awesome-icon
            :icon="['fad', 'shopping-cart']"
            title="Shopping cart"
          />
          <span class="link-text">Cart</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/account" class="nav-link">
          <font-awesome-icon :icon="['fad', 'user-alt']" title="Account" />
          <span class="link-text">Account</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

$cl1: rgba(242,4,202, 1);
$cl2: rgba(123,4,242, 1);
$cl3: rgba(97,3,191, 1);
$cl4: rgba(4,1,89, 1);
$cl5: #f23726;

$transition-speed: 100ms;
$text-primary: #e5e5e5;
$text-secondary: #fff;
$bg-primary: #111;
$bg-secondary: #000;

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
