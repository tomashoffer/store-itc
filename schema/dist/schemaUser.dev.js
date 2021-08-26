"use strict";

var ajvInstance = require('./ajv-instance'); /// AJV Schema


var schemaUsers = {
  type: 'object',
  properties: {
    userName: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 3
    },
    role: {
      type: 'string'
    }
  },
  required: ['userName', 'email', 'password', 'role'],
  additionalProperties: false
};