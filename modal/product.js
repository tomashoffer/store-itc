"use strict";
exports.__esModule = true;
exports.ProductMethods = exports.Product = exports.readAllProducts = void 0;
var fs = require("fs");
var path = require('path');
var pathToProductJson = path.resolve(__dirname, '../db/product.json');
var multer = require("multer");
var uuidv4 = require("uuid").v4;
function readAllProducts() {
    var allProd = fs.readFileSync(pathToProductJson);
    return JSON.parse(allProd);
}
exports.readAllProducts = readAllProducts;
;
var Product = /** @class */ (function () {
    function Product(productName, productDescription, productImage, productPrice, stock, id) {
        (this.productName = productName),
            (this.productDescription = productDescription),
            (this.productImage = productImage),
            (this.productPrice = productPrice);
        (this.stock = stock);
        (this.id = id);
    }
    return Product;
}());
exports.Product = Product;
var ProductMethods = /** @class */ (function () {
    function ProductMethods() {
        this.products = readAllProducts();
    }
    ProductMethods.prototype.updateJsonProduct = function () {
        fs.writeFileSync(pathToProductJson, JSON.stringify(this.products));
    };
    ProductMethods.prototype.addProduct = function (prod) {
        this.products.push(prod);
        this.updateJsonProduct();
    };
    ;
    ProductMethods.prototype.editProducto = function (productIndex, editData) {
        this.products[productIndex].productName = editData.productName;
        this.products[productIndex].productDescription = editData.productDescription;
        this.products[productIndex].productImage = editData.filename;
        console.log(editData.filename);
        this.products[productIndex].productPrice = editData.productPrice;
        this.products[productIndex].stock = editData.stock;
        this.updateJsonProduct();
    };
    ProductMethods.prototype.deleteProducto = function (id) {
        this.products = this.products.filter(function (prod) { return prod.id !== id; });
        this.updateJsonProduct();
    };
    ProductMethods.prototype.decreseStock = function (updateStock) {
        var _this = this;
        var arrStock = Object.values(updateStock);
        arrStock.forEach(function (prod) {
            var findProdIndex = _this.products.findIndex(function (prod) { return prod.id === updateStock.id; });
            _this.products[findProdIndex] = updateStock;
            _this.updateJsonProduct();
        });
    };
    return ProductMethods;
}());
exports.ProductMethods = ProductMethods;
