const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes  = require("./routes")

// env config
dotenv.config();

// Create an Express application
const app = express();

// Cors origin request
app.use(cors());

// Routes
app.use("/", routes);

module.exports = app;
