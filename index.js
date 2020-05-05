var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
app.post("/", function (event) {
  const body = JSON.parse(event.body);
  res.send(JSON.stringify({ Hello: body }));
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
