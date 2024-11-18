const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./configs/config');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});