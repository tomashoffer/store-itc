"use strict";
exports.__esModule = true;
// REQUIRES
var express = require("express");
var router = express.Router();
// CONTROLLERS
var productControllers_1 = require("../controllers/productControllers");
//MIDDLEWARES
var sendCookie_1 = require("../middleware/sendCookie");
// import { isAdmin } from '../middleware/isAdmin';
router.get('/', productControllers_1.getProdSelected);
router.post('/:id', sendCookie_1.selectedProd);
router.get('/getProducts', productControllers_1.getProducts);
router.post('/addProducts', productControllers_1.addProducts);
router.post('/edit/', productControllers_1.editProducts);
router.post('/edit/:id', sendCookie_1.editProdCookie);
router.post('/delete/:id', productControllers_1.deleteProd);
module.exports = router;
