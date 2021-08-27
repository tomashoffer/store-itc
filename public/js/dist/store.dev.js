"use strict";

var getAllProductos = function getAllProductos() {
  var getproductos, productos, getLogIn, getLogInData, role;
  return regeneratorRuntime.async(function getAllProductos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios('/product/getProducts'));

        case 2:
          getproductos = _context.sent;
          productos = getproductos.data;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 6:
          getLogIn = _context.sent;
          getLogInData = getLogIn;
          role = getLogInData.data.role;
          console.log(productos);
          renderProducts(productos, role);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

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
  return regeneratorRuntime.async(function selectedProd$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          postIdSelectedProd = axios.post("/product/".concat(id));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
} // MODAL ADD


function handleAddProd(e) {
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
  return regeneratorRuntime.async(function postProd$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios.post('/product/addProducts', newProd));

        case 2:
          response = _context3.sent;
          console.log(response);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
} // MODAL EDIT


function handleEditModal(e) {
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
          _context6.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/delete/".concat(id)));

        case 2:
          deleteId = _context6.sent;
          getAllProductos();

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

var btnSubmit = document.querySelector('.btnSubmit');
btnSubmit.addEventListener('click', function () {
  getAllProductos();
  window.location.reload();
});
var btnSubmitAdd = document.querySelector('.btnSubmitAdd');
btnSubmitAdd.addEventListener('click', function () {
  getAllProductos();
  window.location.reload();
});

function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context7.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);