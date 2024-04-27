const http = require("http");
const _ = require('lodash');


const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", 'text/plain');
  res.write('hello sagar');
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
