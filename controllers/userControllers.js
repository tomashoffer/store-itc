"use strict";
exports.__esModule = true;
exports.getAllUsers = exports.logInAdmin = exports.logInUser = exports.registerUser = void 0;
var user_1 = require("../modal/user");
var uuidv4 = require("uuid").v4;
var cookieParser = require("cookie-parser");
var methodUser = new user_1.UserMethods();
function registerUser(req, res) {
    var id = uuidv4();
    var role = "user";
    var user = new user_1.User(req.body.name, req.body.email, req.body.password, role, id, []);
    methodUser.addUser(user);
    res.send({ ok: 'success register' });
}
exports.registerUser = registerUser;
function logInUser(req, res) {
    var userIdLogIn = req.cookies.userIdLogIn;
    var allUsers = user_1.readAllUsers();
    var getLogInUser = allUsers.find(function (user) { return user.id === userIdLogIn; });
    console.log(getLogInUser);
    res.send(getLogInUser);
}
exports.logInUser = logInUser;
function logInAdmin(req, res) {
    console.log('User log in');
    res.send({ ok: 'success log in' });
}
exports.logInAdmin = logInAdmin;
function getAllUsers(req, res) {
    var allUsers = user_1.readAllUsers();
    res.send(allUsers);
}
exports.getAllUsers = getAllUsers;
