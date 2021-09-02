"use strict";
exports.__esModule = true;
// REQUIRES
var express = require("express");
var router = express.Router();
var multer = require('multer');
// CONTROLLERS
var productControllers_1 = require("../controllers/productControllers");
//MIDDLEWARES
var sendCookie_1 = require("../middleware/sendCookie");
var uploadImg_1 = require("../middleware/uploadImg");
var upload = multer({ storage: uploadImg_1.storage });
router.get('/', productControllers_1.getProdSelected);
router.post('/:id', sendCookie_1.selectedProd);
router.get('/getProducts', productControllers_1.getProducts);
router.post('/addProducts', upload.single('image'), productControllers_1.addProducts);
router.post('/edit', upload.single('image'), productControllers_1.editProducts);
router.post('/edit/:id', sendCookie_1.editProdCookie);
router.post('/delete/:id', productControllers_1.deleteProd);
router.post('/updateStock', productControllers_1.updateStock);
module.exports = router;
