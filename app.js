const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./configs/config');
const app = express();

dotenv.config();

connectDB();


const customerRouter = require('./router/customerRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Routes */
app.use('/crm', customerRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});