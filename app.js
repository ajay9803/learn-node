const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

const feedRoutes = require("./routes/feed");

// app.use(bodyParser.urlencoded()); // <form>

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feeds", feedRoutes);

app.listen(port);
