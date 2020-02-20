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
          <router-link to="/products" class="nav-button">
            <font-awesome-icon icon="shapes" title="Products"/>
          </router-link>
          <router-link to="/about" class="nav-button">
            <font-awesome-icon icon="info-circle" title="About"/>
          </router-link>
        </div>
        <div class="links">
          <router-link to="/account" class="nav-button">
            <font-awesome-icon icon="user" title="My Account"/>
          </router-link>
          <router-link to="/cart" class="nav-button">
            <font-awesome-icon icon="shopping-cart" title="My Account"/>
          </router-link>
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
