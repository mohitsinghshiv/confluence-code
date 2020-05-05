var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
app.post("/", function (req, res) {
  res.send(res);
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
