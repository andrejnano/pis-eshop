<template>
  <div class="pricing-page">
    <!-- <table>
      <thead>

      </thead>


      <tbody>

        <tr v-for="configuration in configurations" :key="configuration.id">
          <td>{{configuration.id}}
        </tr>

      </tbody>
    </table> -->

    <div class="content-wrapper">
      <h2 class="title">Choose a plan</h2>
      <p class="description">
        High performance virtual machines with an optimal balance of memory
        and dedicated virtual CPUs from the best in class AMD processors.
        A perfect choice for a wide range of common, production use cases,
        like web app hosting, e-commerce sites, medium-sized databases,
        and gaming servers.
      </p>


      <ul class="plans">
        <li v-for="configuration in configurations" :key="configuration.id">
          <button class="plan" @click="select(configuration)">
          <div><span class="main-price">{{ configuration.price }}</span>€/ mo</div>
          <div><span class="hourly-price">{{ configuration.hPrice }}€</span>/ hour</div>
          <div class="separator"></div>
          <div><span class="cpus">{{ configuration.vcpus }}</span> CPUs</div>
          <div><span class="ram">{{ configuration.ram }} GB</span> RAM</div>
          <div><span class="disk">{{ configuration.disk }} GB</span> SSD disk</div>
          <div><span class="transfer">{{ configuration.transfer }} TB</span> transfer</div>
        </button>
        </li>
      </ul>


      <div class="price-calculator">
        <div class="label">Price calculator for 1 year</div>
        <table>
          <tr>
            <td class="left">Subtotal</td><td class="right"> {{ summaryPrice.subTotalYearPrice }}€</td>
          </tr>
          <tr>
            <td class="left">Tax</td><td class="right"> {{ summaryPrice.tax * 100 }}%</td>
          </tr>
          <tr>
            <td class="left">Total</td><td class="right"> {{ summaryPrice.totalPrice }}€</td>
          </tr>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      summaryPrice: {
        subTotalYearPrice: 0.00,
        tax: 0.0,
        totalPrice: 0.00,
      },
      configurations: [
        {
          price: 60,
          hPrice: 0.089,
          vcpus: 2,
          ram: 8,
          disk: 25,
          transfer: 4,
        },
        {
          price: 120,
          hPrice: 0.179,
          vcpus: 4,
          ram: 16,
          disk: 50,
          transfer: 5,
        },
        {
          price: 240,
          hPrice: 0.357,
          vcpus: 8,
          ram: 32,
          disk: 100,
          transfer: 6,
        }
      ]
    }
  },

  methods: {
    select: function(configuration) {
      let subTotalYearPrice = configuration.price * 12;
      let tax = 0.2;

      let totalPrice = subTotalYearPrice + subTotalYearPrice*tax;

      this.summaryPrice = {
        subTotalYearPrice,
        tax,
        totalPrice
      }

    }
  }

}
</script>

<style lang="scss">

.pricing-page {
  background:rgb(247, 247, 255);
  width: 100%;
  height: calc(100vh - 50px);
  display: block;

  .content-wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 90vw;
    padding: 2rem 0;
  }

  .title {
    margin: 0;
    font-weight: 600;
  }

  .description {
    margin-top: 2rem;
    max-width: 900px;
    font-size: 1.5rem;
    line-height: 1.6;
    color: #444;
    font-weight: 400;
  }

  .plans {
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    .plan {
      margin-right: 2rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 1rem 3rem;
      background: #fff;
      font-weight: 400;
      color: #444;
      line-height: 1.5;

      .separator {
        height: 1px;
        width: 100%;
        background: #ccc;
        margin: 1rem 0;
      }


      .main-price {
        color: #000;
        font-weight: 600;
        font-size: 2rem;
      }

      .hourly-price {
        color: #000;
        font-weight: 600;
        font-size: 1rem;
      }

      .cpus {
        color: #000;
        font-weight: 600;
        font-size: 1rem;
      }

      .ram {
        color: #000;
        font-weight: 600;
        font-size: 1rem;
      }

      .disk {
        color: #000;
        font-weight: 600;
        font-size: 1rem;
      }

      .transfer {
        color: #000;
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }


  .price-calculator {
    padding: 1rem 2rem;
    /* background: #fff; */


    .label {
      font-weight: 500;
      font-size: 1.5rem;
      margin: 2rem 0;
    }


    table {
      background: #fff;
      border: 2px solid rgb(247, 247, 255);
      padding: 2rem;

      tr {
        height: 3rem;
        border: 2px solid rgb(247, 247, 255);


        .left {
          padding: 1rem;
          font-size: 1.5rem;
          font-weight: 400;
          border-right: 2px solid rgb(247, 247, 255);
        }

        .right {
          font-size: 2rem;
          font-weight: 800;
          padding: 0 2rem;
        }
      }
    }

  }
}
</style>
