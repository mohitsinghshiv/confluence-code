var express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const rp = require("request-promise-native");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
const client = algoliasearch('1BG45YLJO5', '38a1d2a23ed5658bd4e874e45074a2ce');
const index = client.initIndex('Newdemo');

app.post("/", function (req, res) {
  console.log(req);
  res.send("res");
});

app.post("/g", function (req, res) {
    console.log("req.body.access_token", req.body.access_token);
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/drive/v3/files",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + req.body.access_token,
      },
    };
    await axios(options)
      .then((responce) => {
        console.log("success");
        pushData(responce.data.files);
        return res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        return res
          .status(err.statusCode || 401)
          .json({ message: "Unauthorized Error" });
      });
  });

  async function pushData (records)  {
    records.map((record) => {
      record.objectID = record.id;
      record.image =
        "https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_docs.png";
    });
    for (var i = 0; i < records.length; i++) {
      var r = [];
      r.push(records[i]);
      return index
        .saveObjects(r)
        .then(({ objectIDs }) => {
          return objectIDs;
        })
        .catch((e) => console.log(e));
    }
  };
app.get("/a", async function (req, res) {
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
