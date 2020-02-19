<template>
  <div class="home">
    <h1 class="title">Welcome to the <strong>Eshop</strong></h1>
    <span class="subtitle">This will be filled with products that can be bought..</span>
    <health-check/>
  </div>
</template>


<script>
import HealthCheck from '../components/HealthCheck'

export default {
  name: 'Home',
  components: {
    HealthCheck,
  },
}
</script>


<style lang="scss" scoped>

  .home {
    margin-top: 20%;
  }

  .title {
    color: #eee;
    font-weight: 800;

    strong {
      font-weight: 1000;
      color: #88B04B;
    }
  }

  .subtitle {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0 2rem;
    color: #fff;
  }

</style>
