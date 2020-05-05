var express = require("express");
const bodyParser = require("body-parser");
const rp  = require('request-promise-native')
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
    if (
        req.body.host == null ||
        req.body.username == null ||
        req.body.password == null
      ) {
        return res.status(401).json({ message: "Unauthorized Error" });
      }
      const obj = {
        host: req.body.host,
        username: req.body.username,
        password: req.body.password,
      };
      await rp({
        url: obj.host + "/rest/api/content",
        qs: {
          limit: 20,
          orderBy: "history.lastUpdated",
          expand: [
            "history.lastUpdated",
            "ancestors.page",
            "descendants.page",
            "body.view",
            "space",
          ].join(","),
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${obj.username}:${obj.password}`
          ).toString("base64")}`,
        },
        json: true,
      })
        .then((responce) => {
          console.log("success");
          return res.status(200).json({ message: "success" });
        })
        .catch((err) => {
          return res
            .status(err.statusCode || 401)
            .json({ message: "Unauthorized Error" });
        });
});
app.listen(port, function () {
  console.log(`Example app listening on port !`);
});
