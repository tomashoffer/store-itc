export {};
import { Cart, CartMethods, readAllUsers, readAllCarts, readAllProducts } from "../modal/cart";
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const CartMethod = new  CartMethods()


export function getOrder(req: any, res: any) { 
        const { idProdSelected } = req.cookies
        const allProd = readAllProducts();
        const buyProd = allProd.find(prod => prod.id === idProdSelected);
        buyProd.size = req.body.size
        buyProd.quantity = req.body.quantity;
        // const order = new Cart(buyProd);

        const { userIdLogIn } = req.cookies;
        const allUsers = readAllUsers();
        const indexUser = allUsers.findIndex(user => user.id ===  userIdLogIn)
        CartMethod.addCart(indexUser, buyProd);
        res.send({ok:'success'})
}

