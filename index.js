var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
app.post("/", function (req, res) {
  const body = JSON.parse(req.body);
  res.send(JSON.stringify(body));
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
