"use strict";
exports.__esModule = true;
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart(productName, productDescription, productImage, productPrice, id) {
        (this.productName = productName),
            (this.productDescription = productDescription),
            (this.productImage = productImage),
            (this.productPrice = productPrice);
        (this.id = id);
    }
    return Cart;
}());
exports.Cart = Cart;
