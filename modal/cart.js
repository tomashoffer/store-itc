"use strict";
exports.__esModule = true;
exports.CartMethods = exports.Cart = exports.readAllProducts = exports.readAllSells = exports.readAllUsers = void 0;
var fs = require("fs");
var path = require('path');
var pathToUsersJson = path.resolve(__dirname, '../db/users.json');
var pathToSellsJson = path.resolve(__dirname, '../db/sells.json');
var pathToProductsJson = path.resolve(__dirname, '../db/product.json');
var uuidv4 = require("uuid").v4;
function readAllUsers() {
    var allUsers = fs.readFileSync(pathToUsersJson);
    return JSON.parse(allUsers);
}
exports.readAllUsers = readAllUsers;
;
function readAllSells() {
    var allSells = fs.readFileSync(pathToSellsJson);
    return JSON.parse(allSells);
}
exports.readAllSells = readAllSells;
;
function readAllProducts() {
    var allProd = fs.readFileSync(pathToProductsJson);
    return JSON.parse(allProd);
}
exports.readAllProducts = readAllProducts;
;
var Cart = /** @class */ (function () {
    function Cart(products) {
        (this.products = products);
    }
    return Cart;
}());
exports.Cart = Cart;
var CartMethods = /** @class */ (function () {
    function CartMethods() {
    }
    CartMethods.prototype.addCart = function (indexUser, order) {
        var allUsers = readAllUsers();
        allUsers[indexUser].cart.push(order);
        fs.writeFileSync(pathToUsersJson, JSON.stringify(allUsers));
    };
    ;
    CartMethods.prototype.deleteOrder = function (idProduct, indexUser) {
        var allUsers = readAllUsers();
        var orderToNotDelete = allUsers[indexUser].cart.find(function (prod) { return prod.id !== idProduct; });
        allUsers[indexUser].cart = [orderToNotDelete];
        fs.writeFileSync(pathToUsersJson, JSON.stringify(allUsers));
    };
    return CartMethods;
}());
exports.CartMethods = CartMethods;
