<template>
  <div class="home">


    <div class="featured-panel">
      <h1>One-click install and deploy</h1>
      <div class="subtitle">VPS hosting made easy</div>
      <div class="cta">
        <Button title="Configure a VPS now"/>
      </div>
    </div>

    <!-- <basic-grid>
      <hgroup>
        <h1 class="title">Welcome to the <strong>Eshop</strong></h1>
        <h3 class="subtitle">This will be filled with products that can be bought..</h3>
      </hgroup>
      <div>
        <h4>Here is a button</h4> <Button title="test"/>
        <Card icon="angle-double-right" icontype="fad" title="Some important wide link"/>
      </div>
    </basic-grid>

    <tetris-grid>
      <h1>A</h1>
      <h1>B</h1>
      <h1>C</h1>
    </tetris-grid>

    <health-check/> -->
  </div>
</template>


<script>
// import HealthCheck from '../components/HealthCheck'
import Button from '../components/Button'
// import Card from '../components/Card'

// import BasicGrid from '../layouts/BasicGrid'
// import TetrisGrid from '../layouts/TetrisGrid'

export default {
  name: 'Home',
  components: {
    // HealthCheck,
    Button,
    // Card,
    // BasicGrid,
    // TetrisGrid
  },
}
</script>


<style lang="scss" scoped>


  .featured-panel {
    width: 100%;
    background: blue;
    background: radial-gradient(circle, rgba(62,50,255,1) 0%, rgba(81,81,150,1) 100%);
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);

    min-height: 700px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-weight: 800;
    }

    .subtitle {
      font-size: 2rem;
      font-weight: 500;
    }

    .cta {
      margin: 2rem auto;
    }
  }

</style>
