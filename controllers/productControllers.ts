export {};
import { Product, ProductMethods, readAllProducts } from "../modal/product";
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const methodProd = new ProductMethods()
const allProds = readAllProducts();
const fs = require("fs");
const path = require('path');
const pathToProductJson = path.resolve(__dirname, '../db/product.json')



export function addProducts(req: any, res: any) { 
    const id = uuidv4();
    const { filename } = req.file;
    const product = new Product(req.body.productName, req.body.productDescription, filename, req.body.productPrice, req.body.stock, id);
    methodProd.addProduct(product);
    res.send({ok:'product added successfully'});
}

export function getProducts(req: any, res: any){
    res.send(allProds);
}

export function getProdSelected(req: any, res: any) {
    const { idProdSelected } = req.cookies
    const producto = allProds.find((prod) => prod.id === idProdSelected);
    res.send(producto)
}

export function editProducts(req: any, res: any) {
    const { idEditProd } = req.cookies;
    const productIndex = allProds.findIndex((prod) => prod.id === idEditProd)
    const { filename } = req.file;
    const newProdData = new Product(req.body.productName, req.body.productDescription, filename, req.body.productPrice, req.body.stock, idEditProd);
    console.log(newProdData);
    allProds[productIndex] = newProdData;
    fs.writeFileSync(pathToProductJson, JSON.stringify(allProds));
    res.send({"ok":'success edit'})
}

export function deleteProd(req: any, res: any) {
    const { id } = req.params;
    methodProd.deleteProducto(id)
    res.send({"ok":'success delete'})
}

export function updateStock(req: any, res: any) {
    const updateStock = req.body;
    methodProd.decreseStock(updateStock)
    res.send({"ok":'success update stock'})
}