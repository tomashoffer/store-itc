const fs = require("fs");
const path = require('path');
const pathToProductJson = path.resolve(__dirname, '../db/product.json')
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


export function readAllProducts(){
  const allProd = fs.readFileSync(pathToProductJson);
  return JSON.parse(allProd);
};



export class Product{
    productName:string;
    productDescription:string;
    productImage: string;
    productPrice:number;
    stock: number;
    id: string
    constructor(productName: string, productDescription: string, productImage: string, productPrice: number,  stock: number, id: string) {
        (this.productName = productName), 
        (this.productDescription = productDescription), 
        (this.productImage = productImage),
        (this.productPrice = productPrice);
        (this.stock = stock);
        (this.id = id);
      }
}


export class ProductMethods{  
  products: Array<Product>;
  constructor(){
    this.products = readAllProducts();
  }
  updateJsonProduct(){
    fs.writeFileSync(pathToProductJson, JSON.stringify(this.products));
  }
  addProduct(prod){
    this.products.push(prod);
    this.updateJsonProduct();
  };
  editProducto(productIndex, editData){
    this.products[productIndex].productName = editData.productName;
    this.products[productIndex].productDescription = editData.productDescription;
    this.products[productIndex].productImage = editData.filename;
    console.log(editData.filename)
    this.products[productIndex].productPrice = editData.productPrice;
    this.products[productIndex].stock = editData.stock;
    this.updateJsonProduct();

  }
  deleteProducto(id){
    this.products = this.products.filter(prod => prod.id !== id);
    this.updateJsonProduct();
  }
  decreseStock(updateStock){
    const arrStock = Object.values(updateStock)
    arrStock.forEach((prod)=>{
      const findProdIndex =  this.products.findIndex((prod)=> prod.id === updateStock.id);
      this.products[findProdIndex] = updateStock;
      this.updateJsonProduct();
    }) 
  }
}
