"use strict";
exports.__esModule = true;
exports.deleteProd = exports.editProducts = exports.getProdSelected = exports.getProducts = exports.addProducts = void 0;
var product_1 = require("../modal/product");
var uuidv4 = require("uuid").v4;
var cookieParser = require("cookie-parser");
var methodProd = new product_1.ProductMethods();
var allProds = product_1.readAllProducts();
function addProducts(req, res) {
    var id = uuidv4();
    var product = new product_1.Product(req.body.productName, req.body.productDescription, req.body.productImage, req.body.productPrice, req.body.stock, id);
    methodProd.addProduct(product);
    res.send({ ok: 'product added successfully' });
}
exports.addProducts = addProducts;
function getProducts(req, res) {
    res.send(allProds);
}
exports.getProducts = getProducts;
function getProdSelected(req, res) {
    var idProdSelected = req.cookies.idProdSelected;
    var producto = allProds.find(function (prod) { return prod.id === idProdSelected; });
    res.send(producto);
}
exports.getProdSelected = getProdSelected;
function editProducts(req, res) {
    var idEditProd = req.cookies.idEditProd;
    var productIndex = allProds.findIndex(function (prod) { return prod.id === idEditProd; });
    var newProdData = new product_1.Product(req.body.productName, req.body.productDescription, req.body.productImage, req.body.productPrice, req.body.stock, idEditProd);
    methodProd.editProducto(productIndex, newProdData);
    res.send({ "ok": 'success edit' });
}
exports.editProducts = editProducts;
function deleteProd(req, res) {
    var id = req.params.id;
    methodProd.deleteProducto(id);
    res.send({ "ok": 'success delete' });
}
exports.deleteProd = deleteProd;
