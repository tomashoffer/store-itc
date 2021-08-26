"use strict";
exports.__esModule = true;
exports.UserMethods = exports.User = exports.readAdminUser = exports.readAllUsers = void 0;
var fs = require("fs");
var path = require('path');
var pathToUsersJson = path.resolve(__dirname, '../db/users.json');
var pathToAdminJson = path.resolve(__dirname, '../db/admin.json');
function readAllUsers() {
    var allUsers = fs.readFileSync(pathToUsersJson);
    return JSON.parse(allUsers);
}
exports.readAllUsers = readAllUsers;
;
function readAdminUser() {
    var allUsers = fs.readFileSync(pathToAdminJson);
    return JSON.parse(allUsers);
}
exports.readAdminUser = readAdminUser;
;
var User = /** @class */ (function () {
    function User(name, email, password, role, id, cart) {
        (this.name = name),
            (this.email = email),
            (this.password = password),
            (this.role = role),
            (this.id = id),
            (this.cart = cart);
    }
    return User;
}());
exports.User = User;
var UserMethods = /** @class */ (function () {
    function UserMethods() {
    }
    UserMethods.prototype.addUser = function (user) {
        var allUsers = readAllUsers();
        allUsers.push(user);
        fs.writeFileSync(pathToUsersJson, JSON.stringify(allUsers));
        return allUsers;
    };
    ;
    return UserMethods;
}());
exports.UserMethods = UserMethods;
