"use strict";

var Ajv = require("ajv");

var ajvInstance = new Ajv({
  allErrors: true
});

var addFormats = require("ajv-formats");

addFormats(ajvInstance);
module.exports = ajvInstance;