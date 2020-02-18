<template>
  <div id="app">
    <nav class="navigation">
      <div class="navigation-inner">
        <div class="logo">
          <router-link to="/" class="button">
            <span class="text">Eshop</span>
          </router-link>
        </div>
        <div class="links">
          <router-link to="/products" class="button">Products</router-link>
          <router-link to="/about" class="button">About</router-link>
        </div>
        <div class="links">
          <router-link to="/account" class="button">My account</router-link>
          <router-link to="/cart" class="button">Cart</router-link>
        </div>
      </div>
    </nav>
    <main id="main">
      <router-view class="container flex column justify-content-center"/>
    </main>
  </div>
</template>

<style lang="scss">
</style>
