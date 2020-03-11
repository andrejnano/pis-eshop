<template>
  <div id="app">
    <navigation/>
    <main id="main">
      <router-view/>
    </main>
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
    navigation: () => import(/* webpackChunkName: "navigation" */ './components/Navigation.vue')
  }
}
</script>


<style lang="scss">

// Shift `Main Page Content` according to the Navigation's position
$navbar-size-closed: 5rem;
$navbar-size-open: 16rem;

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
