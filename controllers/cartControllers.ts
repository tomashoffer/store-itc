export {};
import { Cart, CartMethods, readAllUsers, readAllProducts } from "../modal/cart";
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const cartMethod = new  CartMethods()


export function getOrder(req: any, res: any) { 
        const { idProdSelected } = req.cookies
        const allProd = readAllProducts();
        const buyProd = allProd.find(prod => prod.id === idProdSelected);
        buyProd.size = req.body.size
        buyProd.quantity = req.body.quantity;


        const { userIdLogIn } = req.cookies;
        const allUsers = readAllUsers();
        const indexUser = allUsers.findIndex(user => user.id ===  userIdLogIn)
        cartMethod.addCart(indexUser, buyProd);
        res.send({ok:'success'})
}

export function deleteOrder(req: any, res: any) {
        const idProduct = req.params.id;

        const { userIdLogIn } = req.cookies;
        const allUsers = readAllUsers();
        const indexUser = allUsers.findIndex(user => user.id ===  userIdLogIn)
        cartMethod.deleteOrder(idProduct, indexUser)
        res.send({ok:'success'})
}
     