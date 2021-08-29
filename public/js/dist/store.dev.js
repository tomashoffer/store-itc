"use strict";

window.onload = setTimeout(function getAllProductos() {
  var getproductos, productos, getLogIn, role;
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
          role = getLogIn.data.role;
          renderProducts(productos, role);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}, 670);

function renderProducts(productos, role) {
  var root, html, addLink;
  return regeneratorRuntime.async(function renderProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          root = document.querySelector(".grid");
          html = "";
          addLink = document.querySelector('.addNav');

          if (role === "admin") {
            addLink.style.display = 'inline';
            productos.forEach(function (prod) {
              html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n              \n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n                <div class=\"producto_iconos\">\n                <a  data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\" onclick='editProdId(\"").concat(prod.id, "\")'><i onclick='editProdId(\"").concat(prod.id, "\")' class=\"edit_icon fas fa-edit\"></i></a>\n               <i onclick='deleteProdId(\"").concat(prod.id, "\")' style=\"cursor:pointer\" class=\"delete_icon fas fa-trash\"></i>\n                </div>\n            </div>\n        </a>\n    </div> ");
            });
          } else {
            productos.forEach(function (prod) {
              html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n            </div>\n        </a>\n    </div> ");
            });
          }

          root.innerHTML = html;

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function selectedProd(id) {
  var postIdSelectedProd;
  return regeneratorRuntime.async(function selectedProd$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/".concat(id)));

        case 2:
          postIdSelectedProd = _context3.sent;

        case 3:
        case "end":
          return _context3.stop();
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
  return regeneratorRuntime.async(function postProd$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(axios.post('/product/addProducts', newProd));

        case 2:
          response = _context4.sent;
          console.log(response);

        case 4:
        case "end":
          return _context4.stop();
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
  return regeneratorRuntime.async(function editProductData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/edit", newProdData));

        case 2:
          editId = _context5.sent;
          refresh();

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function editProdId(id) {
  var editId;
  return regeneratorRuntime.async(function editProdId$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/edit/".concat(id)));

        case 2:
          editId = _context6.sent;

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function deleteProdId(id) {
  return regeneratorRuntime.async(function deleteProdId$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/delete/".concat(id)));

        case 2:
          refresh();

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}

var btnSubmit = document.querySelector('.btnSubmit');
btnSubmit.addEventListener('click', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          window.location.reload();

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
});
var btnSubmitAdd = document.querySelector('.btnSubmitAdd');
btnSubmitAdd.addEventListener('click', function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          refresh();

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});

function refresh() {
  return regeneratorRuntime.async(function refresh$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          window.location.reload();

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
} // SEARCH BAR


function regExSurvey(searchBar) {
  var getproductos, productos, getLogIn, role, newArray, _loop, i;

  return regeneratorRuntime.async(function regExSurvey$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(axios('/product/getProducts'));

        case 3:
          getproductos = _context11.sent;
          productos = getproductos.data;
          _context11.next = 7;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 7:
          getLogIn = _context11.sent;
          role = getLogIn.data.role;
          newArray = [];

          _loop = function _loop(i) {
            var regExp = "^".concat(searchBar);
            var searchTermReg = new RegExp(regExp, 'g');
            newArray = productos.filter(function (elem) {
              return searchTermReg.test(elem.productName);
            });
          };

          for (i = 0; i < productos.length; i++) {
            _loop(i);
          }

          renderProducts(newArray, role);
          _context11.next = 18;
          break;

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

var searchProduct = function searchProduct(ev) {
  try {
    ev.preventDefault();
    var _searchBar = ev.target.parentElement.elements.searchBar.value;
    regExSurvey(_searchBar);
  } catch (e) {
    console.error(e);
  }
}; // EVENTLISTENERS


var searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', searchProduct); // LOGOUT

function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context12.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);