"use strict";

function getAllProductos() {
  var getproductos, productos;
  return regeneratorRuntime.async(function getAllProductos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios('/product/getProducts'));

        case 2:
          getproductos = _context.sent;
          productos = getproductos.data;
          getLogInUser(productos);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getLogInUser(productos) {
  var getLogIn, getLogInData, role;
  return regeneratorRuntime.async(function getLogInUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 2:
          getLogIn = _context2.sent;
          getLogInData = getLogIn;
          console.log(getLogInData.data);
          role = getLogInData.data.role;
          console.log(role);
          renderProducts(productos, role);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function renderProducts(productos, role) {
  var root = document.querySelector(".grid");
  var html = "";
  var addLink = document.querySelector('.addNav');

  if (role === "admin") {
    addLink.style.display = 'inline';
    productos.forEach(function (prod) {
      html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n                <p class=\"producto__precio\">Description: ").concat(prod.productDescription, "</p>\n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n                <div class=\"producto_iconos\">\n                <a href=\"\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\" onclick='editProdId(\"").concat(prod.id, "\")'><i class=\"edit_icon fas fa-edit\"></i></a>\n                <a href=\"\" class=\"hola\" onclick='deleteProdId(\"").concat(prod.id, "\")'><i class=\"delete_icon fas fa-trash\"></i></a>\n                </div>\n            </div>\n        </a>\n    </div> ");
    });
  } else {
    productos.forEach(function (prod) {
      html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n                <p class=\"producto__precio\">Description: ").concat(prod.productDescription, "</p>\n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n            </div>\n        </a>\n    </div> ");
    });
  }

  root.innerHTML = html;
}

function selectedProd(id) {
  var postIdSelectedProd;
  return regeneratorRuntime.async(function selectedProd$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          postIdSelectedProd = axios.post("/product/".concat(id));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function handleModal(e) {
  e.preventDefault();
  var productName = e.target.elements.productModalName.value;
  var productDescription = e.target.elements.productModalDescription.value;
  var productImage = e.target.elements.productModalImage.value;
  var productPrice = e.target.elements.productModalPrice.value;
  var stock = e.target.elements.stockModal.value;
  var newProdData = {
    productName: productName,
    productDescription: productDescription,
    productImage: productImage,
    productPrice: productPrice,
    stock: stock
  };
  editProductData(newProdData);
}

function editProductData(newProdData) {
  var editId;
  return regeneratorRuntime.async(function editProductData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          editId = axios.post("/product/edit", newProdData);

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function editProdId(id) {
  var editId;
  return regeneratorRuntime.async(function editProdId$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          editId = axios.post("/product/edit/".concat(id));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function deleteProdId(id) {
  var deleteId;
  return regeneratorRuntime.async(function deleteProdId$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          deleteId = axios.post("/product/delete/".concat(id));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
} // <a class="navegacion__enlace" href="addProduct.html">Add Product</a>