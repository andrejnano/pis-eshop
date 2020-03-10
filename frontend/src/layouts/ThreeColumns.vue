<template>
  <div class="three-column-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['gap']
}
</script>

<style lang="scss" scoped>

  .three-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

</style>
