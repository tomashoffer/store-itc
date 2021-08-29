"use strict";
exports.__esModule = true;
// REQUIRES
var express = require("express");
var router = express.Router();
// CONTROLLERS
var cartControllers_1 = require("../controllers/cartControllers");
router.post('/postOrder', cartControllers_1.getOrder);
router.post('/deleteOrder/:id', cartControllers_1.deleteOrder);
module.exports = router;
