"use strict";
exports.__esModule = true;
exports.ProductMethods = exports.Product = exports.readAllProducts = void 0;
var fs = require("fs");
var path = require('path');
var pathToProductJson = path.resolve(__dirname, '../db/product.json');
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
    }
    ProductMethods.prototype.addProduct = function (prod) {
        var allProducts = readAllProducts();
        allProducts.push(prod);
        fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
        return allProducts;
    };
    ;
    ProductMethods.prototype.editProducto = function (productIndex, editData) {
        var allProducts = readAllProducts();
        allProducts[productIndex].productName = editData.productName;
        allProducts[productIndex].productDescription = editData.productDescription;
        allProducts[productIndex].productImage = editData.productImage;
        allProducts[productIndex].productPrice = editData.productPrice;
        allProducts[productIndex].stock = editData.stock;
        fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
        return allProducts;
    };
    ProductMethods.prototype.deleteProducto = function (id) {
        var allProducts = readAllProducts();
        var deleteProd = allProducts.filter(function (prod) { return prod.id !== id; });
        fs.writeFileSync(pathToProductJson, JSON.stringify(deleteProd));
    };
    ProductMethods.prototype.decreseStock = function (updateStock) {
        var allProducts = readAllProducts();
        var arrStock = Object.values(updateStock);
        arrStock.forEach(function (prod) {
            var findProdIndex = allProducts.findIndex(function (prod) { return prod.id === updateStock.id; });
            allProducts[findProdIndex] = updateStock;
            fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
        });
        return allProducts;
    };
    return ProductMethods;
}());
exports.ProductMethods = ProductMethods;
