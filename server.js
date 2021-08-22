"use strict";
exports.__esModule = true;
exports.localJson = void 0;
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var fs = require("fs");
var localJson = function () {
    var fileJson = fs.readFileSync("./db/users.json");
    return JSON.parse(fileJson);
};
exports.localJson = localJson;
// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
// IMPORT ROUTES FILES
// ROUTES
app.listen(port, function () { console.log('listen on 3000'); });
