const fs = require("fs");
const path = require('path');
const pathToUsersJson = path.resolve(__dirname, '../db/users.json');
const pathToCartsJson = path.resolve(__dirname, '../db/cart.json');
const pathToProductsJson = path.resolve(__dirname, '../db/product.json');

export function readAllUsers(){
  const allUsers = fs.readFileSync(pathToUsersJson);
  return JSON.parse(allUsers);
};
export function readAllCarts(){
  const allCarts = fs.readFileSync(pathToCartsJson);
  return JSON.parse(allCarts);
};
export function readAllProducts(){
  const allProd= fs.readFileSync(pathToProductsJson);
  return JSON.parse(allProd);
};

export class Cart{
    products:Array<any>;
    constructor(products:  Array<any>) {
        (this.products = products)

      }
}

export class CartMethods{  
  addCart(indexUser, order){
    const allUsers = readAllUsers();
    allUsers[indexUser].cart.push(order)
    fs.writeFileSync(pathToUsersJson, JSON.stringify(allUsers));
};
}