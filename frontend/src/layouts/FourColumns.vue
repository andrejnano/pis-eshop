<template>
  <div class="four-column-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['gap']
}
</script>

<style lang="scss" scoped>

  .four-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
  }

</style>
