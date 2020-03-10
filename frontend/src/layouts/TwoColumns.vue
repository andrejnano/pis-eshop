<template>
  <div class="two-column-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['gap']
}
</script>

<style lang="scss" scoped>

  .two-column-grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }

</style>
