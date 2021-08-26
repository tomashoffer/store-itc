"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
var readAllUsers = require('../modal/user').readAllUsers;
function isAdmin(req, res, next) {
    var userIdLogIn = req.cookies.userIdLogIn;
    var allUsers = readAllUsers();
    var admin = allUsers.find(function (user) { return user.id === userIdLogIn; });
    if (admin.role === 'admin') {
        console.log('Admin user');
        next();
    }
    else {
        res.status(404).send('This site is only for administrators');
    }
}
exports.isAdmin = isAdmin;
