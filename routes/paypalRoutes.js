"use strict";
exports.__esModule = true;
// REQUIRES
var express = require("express");
var router = express.Router();
// CONTROLLERS
var paypalController_1 = require("../controllers/paypalController");
router.post('/create-payment/:currentTotal', paypalController_1.createPayment);
router.get('/succes', paypalController_1.succesPayment);
router.get('/cancel', paypalController_1.cancelPayment);
module.exports = router;
