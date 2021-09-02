export {};
// REQUIRES
const express = require("express");
const router = express.Router();
const multer = require('multer');


// CONTROLLERS
import { getProducts, addProducts, getProdSelected, editProducts, deleteProd, updateStock } from "../controllers/productControllers";
//MIDDLEWARES
import { selectedProd, editProdCookie } from '../middleware/sendCookie';
import { storage } from '../middleware/uploadImg';
const upload = multer({ storage })

router.get('/', getProdSelected)
router.post('/:id', selectedProd)
router.get('/getProducts', getProducts);
router.post('/addProducts', upload.single('image'), addProducts);
router.post('/edit', upload.single('image'), editProducts);
router.post('/edit/:id', editProdCookie);
router.post('/delete/:id', deleteProd);
router.post('/updateStock', updateStock);

module.exports = router;
