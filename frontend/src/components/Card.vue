<template>
  <a class="card" href="#">
    <font-awesome-icon :icon="[icontype, icon]"/>
    <span class="insideText">{{ title }}</span>
  </a>
</template>

<script>
export default {
  props: [
    'title',
    'type',
    'icon',
    'icontype'
  ]
}
</script>

<style lang="scss">

.card {
  display: block;
  width: 100%;
  padding: 1.5rem 1rem;
  background: #f2f2f2;
  color: #5f5f5f;
  font-size: 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  margin: 0.5rem 0;

  display: grid;
  grid-template-columns: 50px 2fr auto;
  align-items: center;

  border: 2px solid transparent;

  &:hover {
    background: #e5e5e5;
  }

  svg {
    margin: 0 2rem 0 0.5rem;
  }

}

</style>
