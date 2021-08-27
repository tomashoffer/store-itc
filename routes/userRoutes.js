"use strict";
exports.__esModule = true;
// REQUIRES
var express = require("express");
var router = express.Router();
var schemaUser_1 = require("../schema/schemaUser");
var validateUser_1 = require("../middleware/validateUser");
var userExist_1 = require("../middleware/userExist");
var encriptPsw_1 = require("../middleware/encriptPsw");
var sendCookie_1 = require("../middleware/sendCookie");
// CONTROLLERS
var userControllers_1 = require("../controllers/userControllers");
router.post('/register', validateUser_1.validateUser(schemaUser_1.schemaUsers), userExist_1.doesUserExist, encriptPsw_1.encryptPwd, userControllers_1.registerUser);
router.post('/logIn', validateUser_1.validateUser(schemaUser_1.schemaLogIn), encriptPsw_1.compareLogin, sendCookie_1.sendCookieUser, userControllers_1.logInUser);
router.get('/logIn', userControllers_1.logInUser);
router.get('/logOut', sendCookie_1.logOutUser);
module.exports = router;
