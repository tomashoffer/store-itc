"use strict";
exports.__esModule = true;
exports.CartMethods = exports.Cart = exports.readAllProducts = exports.readAllCarts = exports.readAllUsers = void 0;
var fs = require("fs");
var path = require('path');
var pathToUsersJson = path.resolve(__dirname, '../db/users.json');
var pathToCartsJson = path.resolve(__dirname, '../db/cart.json');
var pathToProductsJson = path.resolve(__dirname, '../db/product.json');
function readAllUsers() {
    var allUsers = fs.readFileSync(pathToUsersJson);
    return JSON.parse(allUsers);
}
exports.readAllUsers = readAllUsers;
;
function readAllCarts() {
    var allCarts = fs.readFileSync(pathToCartsJson);
    return JSON.parse(allCarts);
}
exports.readAllCarts = readAllCarts;
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
    return CartMethods;
}());
exports.CartMethods = CartMethods;
