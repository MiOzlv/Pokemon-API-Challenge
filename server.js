const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
// importing routes
const getRouter = require('./routes/get.js');

// set port number
dotenv.config();
const server = express();
const PORT =  process.env.PORT || 5000;


// middleware
server.use(express.json());
server.use(cors());

// set endpoints
server.use('/catch', getRouter);
// app.use('/make', postRouter);


// run server
server.listen(PORT, () => {
    console.log(`Serving running on localhost:${PORT}`);
});