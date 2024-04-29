const express = require("express");
// const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();
const port = 8080;
const databaseUrl = "mongodb://localhost:27017/feeds-app";

const feedRoutes = require("./routes/feed");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
// app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/feeds", feedRoutes);

mongoose
  .connect(databaseUrl)
  .then((_) => {
    app.listen(port);
  })
  .catch((e) => {
    console.log(e);
  });
