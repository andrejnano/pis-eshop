<template>
  <div class="container">
    <header>
      <h3>Dashboard</h3>
    </header>
    <main>

      <section>
        <four-columns class="statistic-group">
          <box
            v-for="statistic in statistics"
            :key="statistic.description"
            class="statistic"
          >
            <font-awesome-icon :icon="['fad', statistic.icon]" />
            <div class="statistic-text-box">
              <span class="statistic-value">{{ statistic.value }}</span>
              <span class="statistic-description">
                {{ statistic.description }}
              </span>
            </div>
          </box>
        </four-columns>
      </section>

      <section>
        <two-columns class="graph-group">
          <box
            v-for="graph in graphs"
            :key="graph.title"
            class="graph">
            <div class="graph-title">{{ graph.title }}</div>
            <div class="graph-content">{{ graph.content }}</div>
          </box>
        </two-columns>
      </section>


      <h3>Basic grid layout ⟶</h3>
      <section class="basic-grid">
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
      </section>


      <h3>Tetris grid layout ⟶</h3>
      <section class="tetris-grid">
       <box class="box-tall"/>
       <box />
       <box />
       <box />
       <box class="box-wide"/>
       <box />
       <box />
       <box />
       <box />
       <box />
      </section>

    </main>
    <footer>
    </footer>
  </div>
</template>

<script>

// todo: refactor this to be more dynamic
import TwoColumns from '../layouts/TwoColumns'
// import ThreeColumns from '../layouts/ThreeColumns'
import FourColumns from '../layouts/FourColumns'

import Box from '../components/Box'

export default {

  data() {
    return {
      statistics: [
        {
          value: "1050€",
          description: "Total sales",
          icon: "sack-dollar"
        },
        {
          value: "2039",
          description: "Products sold",
          icon: "hand-holding-usd"
        },
        {
          value: "120",
          description: "Items in stock",
          icon: "boxes"
        },
        {
          value: "15 minutes ago",
          description: "Last order",
          icon: "history"
        },
      ],

      graphs: [
        {
          title: "Orders",
          content: "List of orders"
        },
        {
          title: "Number of orders",
          content: "Another graph"
        },
        {
          title: "Purchase summary",
          content: "Some graph"
        }
      ]
    }
  },

  components: {
    // ThreeColumns,
    TwoColumns,
    FourColumns,
    Box
  }
}
</script>

<style lang="scss" scoped>

  .statistic-group {
    margin: 50px 0;
  }

  .statistic {
    display: grid;
    grid-template-columns: 50px 1fr;
    margin-right: 40px;

    &:last-child {
      margin-right: 0;
    }

    svg {
      font-size: 40px;
      align-self: center;
    }

    .statistic-text-box {
      .statistic-value {
        font-weight: 700;
        color: #000;
        padding: 0.2em 0;
        text-align: right;
        font-size: 1.4em;
        display: block;
        white-space: nowrap;
      }

      .statistic-description {
        display: block;
        text-align: right;
        font-weight: 500;
        font-size: 1em;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .graph-group {
    margin: 50px 0;
  }

  .graph {
    /* margin-right: 40px;
    margin-bottom: 40px;

    &:nth-child(even) {
      margin-right: 0;
    } */

    .graph-title {
      font-size: 1.2em;
      font-weight: 600;
      display: block;
    }
    .graph-content {

    }
  }
</style>
