"use strict";

function selectedProd() {
  var getProdSelected, data;
  return regeneratorRuntime.async(function selectedProd$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios("/product"));

        case 2:
          getProdSelected = _context.sent;
          data = getProdSelected.data;
          renderProducts(data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderProducts(producto) {
  var root = document.querySelector(".camisa");
  var html = "";
  html += "   <img class=\"camisa__imagen\" src=\"".concat(producto.productImage, "\" alt=\"Imagen del Producto\">\n\n      <div class=\"camisa__contenido\">\n          <h3>").concat(producto.productName, "</h3>\n          <p>").concat(producto.productDescription, "</p>\n          <h3>PRICE FOR EACH: $").concat(producto.productPrice, ",-</h3>\n          <h3>stock: ").concat(producto.stock, "</h3>\n\n          <form class=\"formulario\" onsubmit=\"handleProduct(event)\">\n              <select name=\"size\" class=\"formulario__campo\">\n                  <option disabled selected>-- Select Size --</option>\n                  <option value=\"XS\" class=\"option_size\">XS</option>\n                  <option value=\"M\" class=\"option_size\">M</option>\n                  <option value=\"L\" class=\"option_size\">L</option>\n              </select>\n              <input class=\"formulario__campo input_quantity\" type=\"number\" placeholder=\"Cantidad\" min=\"1\" name=\"quantity\">\n              <input class=\"formulario__submit\" onclick=\"alertCart()\" type=\"submit\" value=\"Agregar al Carrito\">\n          </form>\n      </div> ");
  root.innerHTML = html;
}

function handleProduct(e) {
  e.preventDefault();
  var size = e.target.elements.size.value;
  var quantity = e.target.elements.quantity.value;
  var newOrder = {
    size: size,
    quantity: quantity
  };
  console.log(newOrder);
  postOrder(newOrder);
}

function postOrder(newOrder) {
  var order;
  return regeneratorRuntime.async(function postOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.post('cart/postOrder', newOrder));

        case 2:
          order = _context2.sent;

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function alertCart() {
  swal("Good choice!!", "The item was added to the cart!", "success");
} // lOGOUT


function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context3.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);