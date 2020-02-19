<template>
  <div id="healthcheck">
    <div class="alert-box">
      <span class="caption">Backend connection status</span>
      <a v-bind:href="{backendApiUrl}" title="Backend API" class="url">{{ backendApiUrl }}</a>
      <span class="statusLabel" v-bind:class="{ online: isOnline }">{{ statusText }}</span>

      <span class="response-caption">Response</span>
      <pre class="message"><code>{{ message }}</code></pre>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'healthcheck',
  data() {
    return {
      statusText: "Unknown",
      isOnline: false,
      message: "{ test }",
    }
  },

  methods: {

    callbackend: function () {

      axios.get(this.backendApiUrl)
        .then((response) => {
          this.message = JSON.stringify(response.data, null, 4);

          if (response.status === 200) {
            this.isOnline = true;
            this.statusText = "Online";
          } else {
            this.isOnline = false;
            this.statusText = "Offline";
          }

        })
        .catch((error) => {
          this.message = JSON.stringify(error.data, null, 4);
          this.isOnline = false;
          this.statusText = "Offline";
        });

    }
  },

  mounted() {
    this.callbackend();
    setInterval(function() { this.callbackend(); }.bind(this), 1000);
  },

  computed: {
    backendApiUrl: function() {
      return `${process.env.EXTERNAL_URL}/api/healthcheck`;
    }
  }
}
</script>

<style lang="scss" scoped>

pre code {
  display: block;
  padding: 1.5rem;
  overflow: auto;
  background-color: #333;
  border: 0;
  box-shadow: 2px 4px 25px rgba(0,0,0,.15);
}

code[class*=language-], pre[class*=language-], pre code {
  font-family: Menlo,Roboto Mono,Courier New,monospace;
  color: #b3b9c5;
  direction: ltr;
  text-align: left;
  white-space: pre-wrap;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.7;
  font-weight: 400;
  margin: 0;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
}

#healthcheck {
  position: relative;
  margin: 2rem;

  .alert-box {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 2rem 3rem;

    .caption {
      margin: 1rem 0rem 0.5rem;
      display: block;
      font-weight: 600;
      font-size: 1.4rem;
      color: rgba(255,255,255, 0.85);
    }

    .url {
      margin: 0;
      display: inline-block;
      background: rgba(255,255,255, 0.15);
      padding: 0.2rem 0.4rem;
      color: rgba(255,255,255, 0.5);
      text-decoration: none;
      font-weight: 400;

      &:visited {
        color: inherit;
      }

      &:hover {
        color: lightgreen;
        transition: 0.1s linear color;
      }
    }

    .statusLabel {
      padding: 0.4rem 2rem;
      margin: 1rem 1rem;
      background: orangered;
      font-weight: 600;
      border-radius: 4px;
      opacity: 0.8;

      &.online {
        background: green;
        opacity: 1;
      }
    }

    .response-caption {
      margin: 1.5rem 0 0.75rem;
      display: block;
      font-size: 1em;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
    }

    .message {
      font-size: 0.8em;
      width: 100%;
      margin-right: 1rem;
      height: 100%;
    }
  }
}

</style>
