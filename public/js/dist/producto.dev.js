"use strict";

function selectedProd() {
  var getProdSelected;
  return regeneratorRuntime.async(function selectedProd$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios("/product"));

        case 2:
          getProdSelected = _context.sent;
          renderProducts(getProdSelected.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderProducts(producto) {
  var root = document.querySelector(".camisa");
  var html = "";
  html += "   <img class=\"camisa__imagen\" src=\"".concat(producto.productImage, "\" alt=\"Imagen del Producto\">\n\n      <div class=\"camisa__contenido\">\n          <h3>").concat(producto.productName, "</h3>\n          <p>").concat(producto.productDescription, "</p>\n\n          <form class=\"formulario\">\n              <select class=\"formulario__campo\">\n                  <option disabled selected>-- Seleccionar Talla --</option>\n                  <option>Chica</option>\n                  <option>Mediana</option>\n                  <option>Grande</option>\n              </select>\n              <input class=\"formulario__campo\" type=\"number\" placeholder=\"Cantidad\" min=\"1\">\n              <input class=\"formulario__submit\" type=\"submit\" value=\"Agregar al Carrito\">\n          </form>\n      </div> ");
  root.innerHTML = html;
}