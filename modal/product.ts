const fs = require("fs");
const path = require('path');
const pathToProductJson = path.resolve(__dirname, '../db/product.json')

export function readAllProducts(){
  const allProd = fs.readFileSync(pathToProductJson);
  return JSON.parse(allProd);
};

export class Product{
    productName:string;
    productDescription:string;
    productImage?: string;
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
  addProduct(prod){
    const allProducts = readAllProducts();
    allProducts.push(prod);
    fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
    return allProducts;
  };
  editProducto(productIndex, editData){
    const allProducts = readAllProducts();
    allProducts[productIndex].productName = editData.productName;
    allProducts[productIndex].productDescription = editData.productDescription;
    allProducts[productIndex].productImage = editData.productImage;
    allProducts[productIndex].productPrice = editData.productPrice;
    allProducts[productIndex].stock = editData.stock;
    fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
    return allProducts;
  }
  deleteProducto(id){
    const allProducts = readAllProducts();
    const deleteProd = allProducts.filter(prod => prod.id !== id);
    fs.writeFileSync(pathToProductJson, JSON.stringify(deleteProd));
  }
  decreseStock(updateStock){
    const allProducts = readAllProducts();
    const arrStock = Object.values(updateStock)
    arrStock.forEach((prod)=>{
      const findProdIndex = allProducts.findIndex((prod)=> prod.id === updateStock.id);
      allProducts[findProdIndex] = updateStock;
      fs.writeFileSync(pathToProductJson, JSON.stringify(allProducts));
    })  
    return allProducts;
  }
}
