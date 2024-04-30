const express = require("express");
const app = express();

const postRoutes = require("./feed");
const authRoutes = require("./auth");

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

module.exports = app;
