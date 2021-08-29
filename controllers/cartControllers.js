"use strict";
exports.__esModule = true;
exports.deleteOrder = exports.getOrder = void 0;
var cart_1 = require("../modal/cart");
var uuidv4 = require("uuid").v4;
var cookieParser = require("cookie-parser");
var cartMethod = new cart_1.CartMethods();
function getOrder(req, res) {
    var idProdSelected = req.cookies.idProdSelected;
    var allProd = cart_1.readAllProducts();
    var buyProd = allProd.find(function (prod) { return prod.id === idProdSelected; });
    buyProd.size = req.body.size;
    buyProd.quantity = req.body.quantity;
    var userIdLogIn = req.cookies.userIdLogIn;
    var allUsers = cart_1.readAllUsers();
    var indexUser = allUsers.findIndex(function (user) { return user.id === userIdLogIn; });
    cartMethod.addCart(indexUser, buyProd);
    res.send({ ok: 'success' });
}
exports.getOrder = getOrder;
function deleteOrder(req, res) {
    var idProduct = req.params.id;
    var userIdLogIn = req.cookies.userIdLogIn;
    var allUsers = cart_1.readAllUsers();
    var indexUser = allUsers.findIndex(function (user) { return user.id === userIdLogIn; });
    cartMethod.deleteOrder(idProduct, indexUser);
    res.send({ ok: 'success' });
}
exports.deleteOrder = deleteOrder;
