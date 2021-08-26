"use strict";
exports.__esModule = true;
exports.editProdCookie = exports.selectedProd = exports.sendCookieUser = void 0;
var _a = require('../modal/user'), readAllUsers = _a.readAllUsers, readAdminUser = _a.readAdminUser;
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
// export function sendCookieAdmin(req, res, next) {
//     if (!req.cookies.adminLogIn) {
//        const { email } = req.body;
//        const allAdmin = readAdminUser();
//        const admin = allAdmin.find((user) => user.email === email);  
//       res.cookie('adminLogIn', JSON.stringify(admin), { maxAge: 900000, httpOnly: true });
//     }
//     next();
//   };
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
