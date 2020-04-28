<template>
  <div id="app">

    <navigation/>

    <main id="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
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
  },

  created() {
    if (localStorage.getItem('authToken')) {
      this.$store.dispatch('USER_REQUEST')
    }
  }
}
</script>


<style lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}


/* For all window sizes */
#main {
  min-height: calc(100vh-50px);
  background: #fff;
}

/* For small window */
@media only screen and (max-width: 900px) {
  #main {
    padding-top: 50px;
  }
}

</style>
