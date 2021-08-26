"use strict";
exports.__esModule = true;
exports.doesUserExist = void 0;
var readAllUsers = require('../modal/user').readAllUsers;
function doesUserExist(req, res, next) {
    try {
        var email_1 = req.body.email;
        var allUsers = readAllUsers();
        var user = allUsers.find(function (user) { return user.email === email_1; });
        if (user) {
            res.status(400).send('User Already Exist');
            return;
        }
        next();
    }
    catch (err) {
        console.error(err);
    }
}
exports.doesUserExist = doesUserExist;
;
