"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.compareAdminLogin = exports.compareLogin = exports.encryptPwd = void 0;
var bcrypt = require('bcrypt');
var _a = require('../modal/user'), readAllUsers = _a.readAllUsers, readAdminUser = _a.readAdminUser;
function encryptPwd(req, res, next) {
    var password = req.body.password;
    var saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send('Error Encrypting');
            return;
        }
        req.body.password = hash;
        next();
    });
}
exports.encryptPwd = encryptPwd;
;
function compareLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, allUsers, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    allUsers = readAllUsers();
                    user = allUsers.find(function (user) { return user.email === email; });
                    if (user == null) {
                        return [2 /*return*/, res.status(400).send('Cannot find user')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
                case 2:
                    if (_a.sent()) {
                        next();
                    }
                    else {
                        return [2 /*return*/, res.status(400).send('Incorrect password')];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.compareLogin = compareLogin;
function compareAdminLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email_1, password, adminUser, admin;
        return __generator(this, function (_a) {
            try {
                email_1 = req.body.email;
                password = req.body.password;
                adminUser = readAdminUser();
                admin = adminUser.find(function (user) { return user.email === email_1; });
                if (admin == null || admin.password != password) {
                    return [2 /*return*/, res.status(400).send('Your email or password is incorrect')];
                }
                next();
            }
            catch (err) {
                res.status(500).send();
            }
            return [2 /*return*/];
        });
    });
}
exports.compareAdminLogin = compareAdminLogin;
