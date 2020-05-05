var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.post("/", function (req, res) {
  console.log(req);
  res.send("res");
});
app.get("/a", function (req, res) {
  //console.log(req);
  res.send("get");
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
