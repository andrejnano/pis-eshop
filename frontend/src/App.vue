<template>
  <div id="app">

    <navigation/>
    <main id="main">
      <router-view/>
    </main>


    <shoppingCart/>


  </div>
</template>

<script>
/**
 * Root Vue Component
 * <navigation/> --> Component with links to navigate to Pages
 * <router-view/> --> Page Components bound to URL routes
*/
export default {
  components: {
    navigation: () => import(/* webpackChunkName: "navigation" */ './components/SimpleNavigation.vue'),
    shoppingCart: () => import(/* webpackChunkName: "shoppingCart" */ './components/ShoppingCart.vue')
  }
}
</script>


<style lang="scss">

#sandbox-link {
  position: fixed;
  top: 5px;
  left: 5px;
  width: 150px;
  height: 50px;
  padding: 1rem;
  text-decoration: none;
  font-weight: 1000;
  text-shadow: -1px -2px 1px pink;
  transition: border 100ms ease;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f0f0f;

  &:hover {
    color: #000;
    border: 2px dashed cyan;
  }
}

// Shift `Main Page Content` according to the Navigation's position
/* $navbar-size-closed: 5rem; */
$navbar-size-open: 16rem;
$navbar-size-closed: 0;

/* For all window sizes */
#main {
  min-height: 100vh;
  background: #fff;
}

/* For small window */
@media only screen and (max-width: 600px) {
  #main {
    padding-left: 0;
  }
}

/* For large window */
@media only screen and (min-width: 600px) {
  #main {
    padding-left: $navbar-size-closed;
  }
}
</style>
