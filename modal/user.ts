const fs = require("fs");
const path = require('path');
const pathToUsersJson = path.resolve(__dirname, '../db/users.json');
const pathToAdminJson = path.resolve(__dirname, '../db/admin.json');

export function readAllUsers(){
  const allUsers = fs.readFileSync(pathToUsersJson);
  return JSON.parse(allUsers);
};
export function readAdminUser(){
  const allUsers = fs.readFileSync(pathToAdminJson);
  return JSON.parse(allUsers);
};

export class User {
    name: string;
    email: string;
    password: string;
    role: string;
    id: string;
    cart: Array<any>;
    constructor(name: string, email: string, password: string, role:string, id: string, cart: Array<any>){
      (this.name = name), 
      (this.email = email), 
      (this.password = password),
      (this.role = role),
      (this.id = id),
      (this.cart = cart);
    }
}

export class UserMethods{  
    addUser(user){
      const allUsers = readAllUsers();
      allUsers.push(user);
      fs.writeFileSync(pathToUsersJson, JSON.stringify(allUsers));
      return allUsers;
  };
}
