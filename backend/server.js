require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoconn = require("./database/mongoconn");
const userRouter = require("./user/userRouter");

// database connection
mongoconn();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// Routers
app.use("/", userRouter);
