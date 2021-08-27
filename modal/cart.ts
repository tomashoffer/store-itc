const fs = require("fs");
const path = require('path');
const pathToUsersJson = path.resolve(__dirname, '../db/users.json');
const pathToSellsJson = path.resolve(__dirname, '../db/sells.json');
const pathToProductsJson = path.resolve(__dirname, '../db/product.json');
const { v4: uuidv4 } = require("uuid");

export function readAllUsers(){
  const allUsers = fs.readFileSync(pathToUsersJson);
  return JSON.parse(allUsers);
};
export function readAllSells(){
  const allSells = fs.readFileSync(pathToSellsJson);
  return JSON.parse(allSells);
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

    // console.log(order)
    // const array = 
    // const allSells = readAllSells();

    // fs.writeFileSync(pathToSellsJson, JSON.stringify(order));

};
}