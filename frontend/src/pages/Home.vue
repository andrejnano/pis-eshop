<template>
  <div class="home">

    <two-columns>
      <hgroup>
        <h1 class="title">Welcome to the <strong>Eshop</strong></h1>
        <h3 class="subtitle">This will be filled with products that can be bought..</h3>
      </hgroup>
      <div>
        <h4>Here is a button</h4> <Button title="test"/>
        <Card icon="angle-double-right" icontype="fad" title="Some important wide link"/>
      </div>
    </two-columns>

    <three-columns>
      <h1>A</h1>
      <h1>B</h1>
      <h1>C</h1>
    </three-columns>

    <health-check/>
  </div>
</template>


<script>
import HealthCheck from '../components/HealthCheck'
import Button from '../components/Button'
import Card from '../components/Card'
import TwoColumns from '../layouts/TwoColumns'
import ThreeColumns from '../layouts/ThreeColumns'


export default {
  name: 'Home',
  components: {
    HealthCheck,
    Button,
    Card,
    TwoColumns,
    ThreeColumns
  },
}
</script>


<style lang="scss" scoped>

  .home {
    padding-top: 20%;
  }

  .title {
    color: #ccc;
    font-weight: 600;

    strong {
      font-weight: 600;
      color: orangered;
    }
  }

  .subtitle {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    color: #222;
  }

</style>
