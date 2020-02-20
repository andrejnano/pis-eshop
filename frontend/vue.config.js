// Vue app configuration file
// For more info see: https://cli.vuejs.org/config/#vue-config-js

// console.log("FRONTEND_PORT => " + process.env.FRONTEND_PORT);

module.exports = {
  // options...
  devServer: {
    port: (process.env.FRONTEND_PORT !== undefined) ? process.env.FRONTEND_PORT : 3000
  }
}
