export {};
import { User, UserMethods, readAllUsers } from "../modal/user";
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const methodUser = new UserMethods()


export function registerUser(req: any, res: any) { 
        const id = uuidv4();
        let role = "user";
        const user = new User(req.body.name, req.body.email, req.body.password, role, id, []);
        methodUser.addUser(user);
        res.send({ok:'success register'})
}

export function logInUser(req: any, res: any) {
        const { userIdLogIn } = req.cookies;
        const allUsers = readAllUsers();
        const getLogInUser = allUsers.find(user => user.id === userIdLogIn);
        console.log(getLogInUser)
        res.send(getLogInUser)
}

export function logInAdmin(req: any, res: any) {
        console.log('User log in')
        res.send({ok:'success log in'})
}

export function getAllUsers(req: any, res: any) {
        const allUsers = readAllUsers();
        res.send(allUsers);
}

