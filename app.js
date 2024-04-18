const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const bodyParser = require("body-parser");
const route = require("./src/routes/api");
const db = require("./src/DataBase/db");

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", route);
app.use("/api/v2", route);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

module.exports = app;
