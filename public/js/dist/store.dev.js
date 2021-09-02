"use strict";

window.onload = setTimeout(function getAllProductos() {
  var getproductos, productos, getLogIn, role, welcomeMessage;
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
          welcomeMessage = document.querySelector('#welcome');
          welcomeMessage.innerHTML = "Welcome, ".concat(getLogIn.data.name);
          renderProducts(productos, role);

        case 11:
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
              html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"images/").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n              \n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n                <div class=\"producto_iconos\">\n                <a  data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\" onclick='editProdId(\"").concat(prod.id, "\")'><i onclick='editProdId(\"").concat(prod.id, "\")' class=\"edit_icon fas fa-edit\"></i></a>\n               <i onclick='deleteProdId(\"").concat(prod.id, "\")' style=\"cursor:pointer\" class=\"delete_icon fas fa-trash\"></i>\n                </div>\n            </div>\n        </a>\n    </div> ");
            });
          } else {
            productos.forEach(function (prod) {
              html += "   <div class=\"producto\">\n        <a href=\"producto.html\" onclick='selectedProd(\"".concat(prod.id, "\")'>\n            <img class=\"producto__imagen\" src=\"images/").concat(prod.productImage, "\" alt=\"imagen camisa\">\n            <div class=\"producto__informacion\">\n                <p class=\"producto__nombre\">").concat(prod.productName, "</p>\n                <p class=\"producto__precio\">$").concat(prod.productPrice, "</p>\n                <p class=\"producto__precio\">Stock: ").concat(prod.stock, "</p>\n            </div>\n        </a>\n    </div> ");
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


function handleAddProd(ev) {
  var _ev$target$elements, productName, productDescription, productPrice, stock, headersForFile, fd, inputImg, imgFile, addProduct;

  return regeneratorRuntime.async(function handleAddProd$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, productName = _ev$target$elements.productName, productDescription = _ev$target$elements.productDescription, productPrice = _ev$target$elements.productPrice, stock = _ev$target$elements.stock;
          productName = productName.value.toUpperCase();
          productDescription = productDescription.value;
          productPrice = productPrice.value;
          stock = stock.value;
          headersForFile = {
            'Content-Type': 'multipart/form-data'
          };
          fd = new FormData();
          inputImg = document.getElementById("image");
          imgFile = inputImg.files[0];
          fd.append('productName', productName);
          fd.append('productDescription', productDescription);
          fd.append('productPrice', productPrice);
          fd.append('stock', stock);
          fd.append('image', imgFile, "".concat(imgFile.name));
          console.log(fd);

          if (!(!productName || !productDescription || !productPrice || !stock)) {
            _context4.next = 18;
            break;
          }

          throw new Error("Please complete all the fields");

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(axios.post('/product/addProducts', fd, {
            headers: headersForFile
          }));

        case 20:
          addProduct = _context4.sent;

          if (addProduct) {
            swal("Good job!", "success");
            ev.target.reset();
          }

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  });
} // MODAL EDIT


function handleEditModal(ev) {
  var _ev$target$elements2, productName, productDescription, productPrice, stock, headersForFile, fd, inputImagen, imgFiles, editProduct;

  return regeneratorRuntime.async(function handleEditModal$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ev.preventDefault();
          _ev$target$elements2 = ev.target.elements, productName = _ev$target$elements2.productName, productDescription = _ev$target$elements2.productDescription, productPrice = _ev$target$elements2.productPrice, stock = _ev$target$elements2.stock;
          productName = productName.value.toUpperCase();
          productDescription = productDescription.value;
          productPrice = productPrice.value;
          stock = stock.value;
          headersForFile = {
            'Content-Type': 'multipart/form-data'
          };
          fd = new FormData();
          inputImagen = document.getElementById("imageEdit");
          imgFiles = inputImagen.files[0];
          fd.append('productName', productName);
          fd.append('productDescription', productDescription);
          fd.append('productPrice', productPrice);
          fd.append('stock', stock);
          fd.append('image', imgFiles, "".concat(imgFiles.name));
          console.log(fd);

          if (!(!productName || !productDescription || !productPrice || !stock)) {
            _context5.next = 18;
            break;
          }

          throw new Error("Please complete all the fields");

        case 18:
          _context5.next = 20;
          return regeneratorRuntime.awrap(axios.post('/product/edit', fd, {
            headers: headersForFile
          }));

        case 20:
          editProduct = _context5.sent;

          if (editProduct) {
            swal("Good job!", "success");
            ev.target.reset();
          }

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function editProductData(newProdData) {
  return regeneratorRuntime.async(function editProductData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!"
          }).then(function _callee() {
            var editId;
            return regeneratorRuntime.async(function _callee$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return regeneratorRuntime.awrap(axios.post("/product/edit", newProdData));

                  case 2:
                    editId = _context6.sent;
                    refresh();

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function editProdId(id) {
  var editId;
  return regeneratorRuntime.async(function editProdId$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(axios.post("/product/edit/".concat(id)));

        case 2:
          editId = _context8.sent;

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function deleteProdId(id) {
  return regeneratorRuntime.async(function deleteProdId$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true
          }).then(function (willDelete) {
            if (willDelete) {
              swal("Poof! Your product has been deleted!", {
                icon: "success"
              }).then(function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return regeneratorRuntime.awrap(axios.post("/product/delete/".concat(id)));

                      case 2:
                        refresh();

                      case 3:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              });
            } else {
              swal("Your product is safe!");
            }
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
}

var btnSubmit = document.querySelector('.btnSubmit');
btnSubmit.addEventListener('click', function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          window.location.reload();

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
});
var btnSubmitAdd = document.querySelector('.btnSubmitAdd');
btnSubmitAdd.addEventListener('click', function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          refresh();

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
});

function refresh() {
  return regeneratorRuntime.async(function refresh$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          window.location.reload();

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    var prevImg = document.querySelector('.previewImage');

    reader.onload = function (e) {
      try {
        prevImg.style.display = 'block';
        prevImg.setAttribute("src", "".concat(e.target.result));
      } catch (error) {
        console.error(error);
      }

      return e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function readURLAdd(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    var prevImg = document.querySelector('.previewImageAdd');

    reader.onload = function (e) {
      try {
        prevImg.style.display = 'block';
        prevImg.setAttribute("src", "".concat(e.target.result));
      } catch (error) {
        console.error(error);
      }

      return e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
} // SEARCH BAR


function regExSurvey(searchBar) {
  var getproductos, productos, getLogIn, role, newArray, _loop, i;

  return regeneratorRuntime.async(function regExSurvey$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(axios('/product/getProducts'));

        case 3:
          getproductos = _context14.sent;
          productos = getproductos.data;
          _context14.next = 7;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 7:
          getLogIn = _context14.sent;
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
          _context14.next = 18;
          break;

        case 15:
          _context14.prev = 15;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);

        case 18:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

var searchProduct = function searchProduct(ev) {
  try {
    ev.preventDefault();
    var _searchBar = ev.target.parentElement.elements.searchBar.value;
    regExSurvey(_searchBar.toUpperCase());
    console.log(_searchBar.toUpperCase());
  } catch (e) {
    console.error(e);
  }
}; // EVENTLISTENERS


var searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', searchProduct); // LOGOUT

function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context15.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);