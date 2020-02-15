'use strict';


/* Example of a primitive Express.js web server */

// import express.js framework
const express = require('express')


// basic configuration
const PORT = 4000;
const HOST = '0.0.0.0';


// instantiate express app globally
const app = express();


// Setup the index route "/" and return simple message
app.get('/', (req, res) => {
	res.send('Backend is live.');
});


// Start listening on a given port and host address/network interface
app.listen(PORT, HOST, () => {
	console.log(`Backend server is listening at: ${HOST}:${PORT}`);
});