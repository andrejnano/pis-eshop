<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .box {
    display: block;
    padding: 25px;
    background: #fff;
    border: 1px solid #efefef;
    border-radius: 2px;
    box-shadow: 0px 0px 2px 2px #efefef;
  }
</style>
