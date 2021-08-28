export {};
// REQUIRES
const express = require("express");
const router = express.Router();

// CONTROLLERS
import { getProducts, addProducts, getProdSelected, editProducts, deleteProd, updateStock } from "../controllers/productControllers";
//MIDDLEWARES
import { selectedProd, editProdCookie } from '../middleware/sendCookie';
// import { isAdmin } from '../middleware/isAdmin';

router.get('/', getProdSelected)
router.post('/:id', selectedProd)
router.get('/getProducts', getProducts);
router.post('/addProducts', addProducts);
router.post('/edit/', editProducts);
router.post('/edit/:id', editProdCookie);
router.post('/delete/:id', deleteProd);
router.post('/updateStock', updateStock);

module.exports = router;
