/*
 * Copyright (c) 2015 Interactive Intelligence
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var http = require("http");
var express = require("express");
var app = express();
var cors = require("cors");

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(express.static(__dirname + "/docs"));
app.use(cors());
app.use(allowCrossDomain);
app.options("*", cors());
app.set("port", process.env.PORT || 3000);

var httpServer = http.createServer(app);

httpServer.listen(app.get("port"));
console.log("App started on port : " + app.get("port"));
