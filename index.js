/*
* Copyright (c) 2015 Interactive Intelligence
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var http = require("http");
var https = require("https"),
    fs = require("fs");
var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static(__dirname+ "/docs"));
app.use(cors());
app.set('port', process.env.PORT || 3000);

var sslOptions = {
    key: fs.readFileSync('https-requirements/_localhost.key'),
    cert: fs.readFileSync('https-requirements/_localhost.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(sslOptions, app);

var httpsPort = 3001;

httpServer.listen(app.get('port'));
console.log("App started on port : " + app.get('port'));

// console.log("starting on " + httpsPort + ' (https)');
// httpsServer.listen(httpsPort);
