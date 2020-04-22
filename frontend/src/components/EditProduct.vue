<template>
 
    <button class="product">   
                    <button  @click="execute()">
                <font-awesome-icon :icon="[ 'fad', 'trash' ]" />
            </button>  
    <div class="cover">

        <div class="configuration">
        <ul>
            <li>
            <label>RAM</label> 
            <input v-model="memory" placeholder="memory">
            </li>
            <li>
            <label>vCPU's</label>
            <input v-model="cpu" placeholder="cpu">
            </li>
            <li>
            <label>HDD</label>
            <input v-model="hdd" placeholder="hdd">
            </li>
            <li>
            <label>Type</label>
            <input v-model="hddType" placeholder="hddType">
            </li>
            <li>
            <label>IP's</label>
            <input v-model="ipCount" placeholder="ipCount">
            </li>
        </ul>
        </div>
        <font-awesome-icon :icon="[ 'fad', 'server' ]" />
    </div>
    <div class="top-info">

        <div class="column">
        <div class="main-title">
            <input v-model="name" placeholder="name">
        </div>
        </div>
        <div class="column">
        <div class="label">Price:</div>
        <input v-model="price" placeholder="price">
        </div>
    </div>
    <div class="description"><textarea v-model="description" placeholder="add multiple lines"></textarea></div>


    </button>

</template>


<script>

export default {
   data() {
    return {
      memory: '',
      cpu: '',
      hdd: '',
      hddType: '',
      ipCount: '',
      name: '',
      price: '',
      description: '',
    }
  },
  props: {
    createProduct: { type: Function },
  },
  methods: {
    execute() {
        console.log("here")
        if (this.createProduct) {
            let product = {
                "name": this.name,
                "configuration": {
                    "os": "Minecraft",
                    "memory": this.memory,
                    "cpu": this.cpu,
                    "hdd": this.hdd,
                    "hddType": "HDD",
                    "ipCount": this.ipCount,
                },
                "category": this.$route.params.category_id,
                "price": this.price,
                "icon": "server",
                "description": this.description
            }
          this.createProduct(product)
        }
      }
  }
}
</script>


<style lang="scss" scoped>

    .product {

        padding: 0;
        background: #fff;
        /* box-shadow: 1px solid #ccc; */
        appearance: none;
        /* outline: none; */
        border: none;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        position: relative;


        .cover {
          background: #5F5CFF;
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: #fff;
          font-size: 3rem;
        }


        .top-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 2rem 2rem;

          .column {
            width: 50%;
          }

          .main-title {
            line-height: 2;
            font-size: 1.6rem;
            font-weight: 600;
            text-align: left;
          }

          .sub-title {
            font-size: 1rem;
            font-weight: 600;
            color: #666;
            text-align: left;
          }

          .label {
            font-size: 1rem;
            font-weight: 500;
            color: #666;
            text-align: right;
            margin: 0.5rem;
          }

          .price {
            font-size: 1.4rem;
            font-weight: 600;
            text-align: right;
            color: #5F5CFF;
          }
        }

        .configuration {
          text-align: left;
          display: table;
          width: 50%;

          li {
            list-style-type: circle;
            color: #fff;
            display: table-row;

            label {
              display: table-cell;
              font-weight: 400;
              font-size: 1rem;
            } 

            input {
              display: table-cell;
              font-weight: 600;
              font-size: 1.5rem;
              border: none;
              width: 5rem;
              padding: 0;
              margin: 0;
              border-bottom: 2px solid #fff;
              color: #fff;
              background-color: transparent;
              margin-left: 3rem;
            }
            input::placeholder {
                color: #ccc;
            }
          }
        }

        .description {
          border-top: 1px solid #ccc;
          padding: 2rem 2rem;
          text-align: left;
          font-weight: 400;
          color: #666;
        }


      }
  
</style>
