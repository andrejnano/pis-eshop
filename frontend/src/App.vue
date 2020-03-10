<template>
  <div id="app">
    <navigation/>
    <main id="main">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
$navbar-size-closed: 5rem;
$navbar-size-open: 16rem;

#main {
  min-height: 100vh;
  background: #fff;
  /* border: 1rem solid #110; */
}

/* Small screens */
@media only screen and (max-width: 600px) {

  #main {
    padding-left: 0;
  }

}

/* Large screens */
@media only screen and (min-width: 600px) {

  #main {
    padding-left: $navbar-size-closed;
  }

}

</style>

<script>
export default {
  components: {
    navigation: () => import(/* webpackChunkName: "navigation" */ './components/Navigation.vue')
  }
}
</script>
