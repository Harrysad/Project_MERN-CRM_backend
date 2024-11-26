const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/config");
const app = express();

dotenv.config();

connectDB();

const customerRouter = require("./router/customerRouter");
const actionRouter = require("./router/actionRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/customers", customerRouter);
app.use("/actions", actionRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
