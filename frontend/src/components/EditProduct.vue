<template>
 
    <button class="product">   

    <div class="cover">

        <div class="configuration">
        <ul>
            <li>
            <label>RAM</label> 
            <select v-model="memory">
              <option disabled value="">RAM</option>
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
              <option>64</option>
              <option>128</option>
            </select> GB
            </li>
            <li>
            <label>vCPU's</label>
            <select v-model="cpu">
              <option disabled value="">vCPU's</option>
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
              <option>64</option>>
            </select>
            </li>
            <li>
            <label>HDD</label>
            <select v-model="hdd">
              <option disabled value="">Hdd</option>
              <option>128</option>
              <option>256</option>
              <option>512</option>
              <option>1024</option>
            </select> GB
            </li>
            <li>
            <label>Type</label>
            <select v-model="hddType">
              <option disabled value="">Hdd Type</option>
              <option>HDD</option>
              <option>SSD</option>
            </select>
            </li>
            <li>
            <label>IP's</label>
            <input v-model="ipCount" placeholder="1 - 255">
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
        <input v-model="price" placeholder="price">€/month
        </div>
    </div>
    <div class="description"><textarea v-model="description" placeholder="New product description"  rows="4"></textarea></div>
    <div class="footer">
            <button  @click="execute()">
              TODO Icon
                <font-awesome-icon :icon="[ 'fad', 'plus' ]" />
            </button>  
    </div>
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
    showWindow: { type: Function },
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
        display: block; 
        position: fixed; 
        bottom: -2%; 
        left: 40%;
        padding: 0;
        background: #fff;
        appearance: none;
        /* outline: none; */
        border: none;
        box-shadow: -26px -13px 62px 4px rgba(0,0,0,0.24);        
        width: 60%;
        z-index: 10;

        .cover {
          background: #5F5CFF;
          width: 100%;
          height: 250px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: #fff;
          font-size: 3rem;
        }

        .footer {
          background: #5F5CFF;
          height: 80px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: #fff;
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

          input {
              display: table-cell;
              font-weight: 600;
              font-size: 1.5rem;
              border: none;
              width: 5rem;
              padding: 0;
              margin: 0;
              border-bottom: 2px solid #5F5CFF;
              color: #5F5CFF;
              background-color: transparent;
              margin-left: 3rem;
            }
            input::placeholder {
                color: #5F5CFF;
            }
        }

        .configuration {
          text-align: left;
          display: table;
          width: 70%;
          padding: 1rem;

          li {
            color: #fff;
            display: table-row;
            width: 100%;

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
              width: 12rem;
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

        textarea {
          border: solid 1px #5F5CFF;
             resize: vertical;
             width:100%

        }


      }
  
</style>
