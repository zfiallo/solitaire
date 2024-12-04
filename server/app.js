const express = require('express');
const cors = require('cors')
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//make the server
let server;
let port = process.env.PORT || process.env.NODE_PORT || 5000;

//Page listeners
let router = require("./router.js");
router(app);

//Service listeners - Mongo
let services = require("./services.js");
services(app);

//listen
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);
});