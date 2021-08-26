"use strict";

function handleProd(e) {
  e.preventDefault();
  var productName = e.target.elements.productName.value;
  var productDescription = e.target.elements.productDescription.value;
  var productImage = e.target.elements.productImage.value;
  var productPrice = e.target.elements.productPrice.value;
  var stock = e.target.elements.stock.value;
  var newProd = {
    productName: productName,
    productDescription: productDescription,
    productImage: productImage,
    productPrice: productPrice,
    stock: stock
  };
  postProd(newProd);
}

function postProd(newProd) {
  var response;
  return regeneratorRuntime.async(function postProd$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.post('/product/addProducts', newProd));

        case 2:
          response = _context.sent;
          console.log(response);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}