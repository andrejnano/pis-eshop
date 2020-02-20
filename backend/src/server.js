'use strict';

/* Example of a primitive Express.js web server */

// import express.js framework
const express = require('express')
let cors = require('cors')

// basic configuration
const PORT = (process.env.BACKEND_PORT === undefined) ? 4000 : process.env.BACKEND_PORT;
const HOST = '0.0.0.0';

// instantiate express app globally
const app = express();

app.use(cors())

// Setup the index route "/" and return simple message
app.get('/api', (req, res) => {
	res.send('Backend is live.');
});

app.get('/api/healthcheck', (req, res) => {

  res.type('application/json')

  res.statusCode = 200

  let returnData = {
    timestamp: Date.now(),
    msg: `This is a msg from Backend at :${PORT}`
  };

  return res.send(returnData);
});


// Start listening on a given port and host address/network interface
app.listen(PORT, HOST, () => {
	console.log(`Backend server is listening at: ${HOST}:${PORT}`);
});
