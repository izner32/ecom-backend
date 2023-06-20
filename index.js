const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

const app = express();
const PORT = 3000;

// Port
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
}); 

// DB Connection
mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@ecom-backend.kdyb994.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('error', console.error.bind(console, 'Connection Error'));
mongoose.connection.once('open', () => console.log("Connected to DB"));

// Middleware
app.use(express.json());




