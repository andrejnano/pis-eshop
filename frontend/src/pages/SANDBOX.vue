<template>
  <tetris-grid>
    <box-component/>
    <button-component/>
    <card-component/>
    <health-check-component/>
    <!-- <navigation-component/> -->
  </tetris-grid>
</template>

<script>

// This is the place where all components are displayed next each other

import TetrisGrid from '../layouts/TetrisGrid'

import BoxComponent from '../components/Box'
import ButtonComponent from '../components/Button'
import CardComponent from '../components/Card'
import HealthCheckComponent from '../components/HealthCheck'
// import NavigationComponent from '../components/Navigation'

export default {
  components: {

    TetrisGrid: TetrisGrid,

    // pages
    // AboutPage: () => require('./About'),
    // AccountPage: () => require('./Account'),
    // CartPage: () => require('./Cart'),
    // DashboardPage: () => require('./Dashboard'),

    // components
    BoxComponent,
    ButtonComponent,
    CardComponent,
    HealthCheckComponent,
    // NavigationComponent,
  }
}
</script>

<style>

</style>
