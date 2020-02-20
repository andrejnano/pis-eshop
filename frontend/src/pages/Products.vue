<template>
  <div class="products-page">
    <h1>This is a products page</h1>

    <div class="product-wall">
      <div>
        <h4>Title</h4>
        <p class="description">
          Some description
        </p>
        <code>tags</code>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>


<style lang="scss" scoped>


.products-page {
  color: #fff;
}


.product-wall {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > div {
    margin: 0 1rem 2rem;
    padding: 1rem;
    width: 180px;
    background: #121212;
    color: #fff;
    border-radius: 10px;
    height: auto;
    min-height: 291.24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .description {
      color: rgba(255,255,255,0.75);
    }
  }
}
</style>
