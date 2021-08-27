"use strict";
exports.__esModule = true;
exports.logOutUser = exports.editProdCookie = exports.selectedProd = exports.sendCookieUser = void 0;
var readAllUsers = require('../modal/user').readAllUsers;
function sendCookieUser(req, res, next) {
    var email = req.body.email;
    var allUsers = readAllUsers();
    var user = allUsers.find(function (user) { return user.email === email; });
    var cookie = user.id;
    res.cookie('userIdLogIn', cookie, { maxAge: 900000000000, httpOnly: true });
    console.log(user);
    next();
}
exports.sendCookieUser = sendCookieUser;
;
function selectedProd(req, res, next) {
    var id = req.params.id;
    res.cookie("idProdSelected", id, { maxAge: 300000000, httpOnly: true });
    next();
}
exports.selectedProd = selectedProd;
function editProdCookie(req, res, next) {
    var id = req.params.id;
    res.cookie("idEditProd", id, { maxAge: 300000000, httpOnly: true });
    res.send({ ok: 'succes' });
}
exports.editProdCookie = editProdCookie;
function logOutUser(req, res) {
    res.clearCookie('userIdLogIn');
    console.log('llego');
    res.send({ ok: 'succes' });
}
exports.logOutUser = logOutUser;
