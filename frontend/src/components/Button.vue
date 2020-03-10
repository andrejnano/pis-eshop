<template>
  <a class="regularButton" href="#">{{ title }}</a>
</template>

<script>
export default {
  props: ['title', 'type']
}
</script>

<style lang="scss">

.regularButton {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background: #f2f2f2;
  color: #5f5f5f;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    background: #e5e5e5;
  }
}

</style>
