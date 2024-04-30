const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/index");

const port = 8080;
const databaseUrl = "mongodb://localhost:27017/feeds-app";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use("/", routes);

app.use((error, req, res, next) => {
  console.log('handled here.');
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({
    message: message,
    data: data,
  });
});

// app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(databaseUrl)
  .then((_) => {
    app.listen(port);
  })
  .catch((e) => {
    console.log(e);
  });
