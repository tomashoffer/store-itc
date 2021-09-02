"use strict";

function renderTable() {
  var getCurrentUser, data, role, getAllUsers, dataAllUsers, welcomeMessage, root, html;
  return regeneratorRuntime.async(function renderTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 2:
          getCurrentUser = _context.sent;
          data = getCurrentUser.data.cart;
          role = getCurrentUser.data.role;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios('/user/allUsers'));

        case 7:
          getAllUsers = _context.sent;
          dataAllUsers = getAllUsers.data;
          welcomeMessage = document.querySelector('#welcome');
          welcomeMessage.innerHTML = "Welcome, ".concat(getCurrentUser.data.name);
          root = document.querySelector(".cart_row");
          html = "";

          if (role === "admin") {
            dataAllUsers.forEach(function (user) {
              var allCarts = user.cart;
              allCarts.forEach(function (cart) {
                html += "<tr>\n            <th scope=\"row\"><img style=\"height: 6rem; width: 6rem;\" src=\"images/".concat(cart.productImage, "\" alt=\"\"></th>\n            <td>").concat(cart.productName, "</td>\n            <td>").concat(cart.size, "</td>\n            <td>").concat(cart.quantity, "</td>\n            <td>").concat(cart.productPrice, "</td>\n            <td>").concat(cart.productPrice * cart.quantity, "</td>\n            <td>-</td>\n            </tr>");
                totalToPay(cart.productPrice * cart.quantity);
              });
            });
          } else {
            data.forEach(function (prod) {
              html += "<tr>\n            <th scope=\"row\"><img style=\"height: 6rem; width: 6rem;\" src=\"images/".concat(cart.productImage, "\" alt=\"\"></th>\n            <td>").concat(prod.productName, "</td>\n            <td>").concat(prod.size, "</td>\n            <td>").concat(prod.quantity, "</td>\n            <td>").concat(prod.productPrice, "</td>\n            <td>").concat(prod.productPrice * prod.quantity, "</td>\n            <td><a class=\"hola\" onclick='deleteSell(\"").concat(prod.id, "\")'><i class=\"delete_icon fas fa-trash\"></i></a></td>\n            </tr>");
              console.log(prod.id);
              totalToPay(prod.productPrice * prod.quantity);
            });
          }

          root.innerHTML = html;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

var currentTotal = 0;

function totalToPay(totalToPay) {
  var total, html, getCurrentUser, role, paypal;
  return regeneratorRuntime.async(function totalToPay$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          total = document.querySelector(".total");
          currentTotal = currentTotal + totalToPay;
          html = "<p>".concat(currentTotal, "</p>");
          total.innerHTML = html;
          _context2.next = 6;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 6:
          getCurrentUser = _context2.sent;
          role = getCurrentUser.data.role;
          paypal = document.querySelector(".paypal");

          if (role === "admin") {
            htmlPaypal = "";
          } else {
            htmlPaypal = "<button style=\"padding: 1rem; font-size: 2.5rem;\" type=\"button\" onclick='payment(".concat(currentTotal, ")' class=\"btn btn-warning btn_paypal\">PAY WITH PAYPAL</button>");
          }

          paypal.innerHTML = htmlPaypal;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function payment(currentTotal) {
  return regeneratorRuntime.async(function payment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            axios.post("/paypal/create-payment/".concat(currentTotal)).then(function (data) {
              redirectToPayment(data.data);
            });
            descreaseStock();
          } catch (e) {
            console.log(e);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function descreaseStock() {
  var getCurrentUser, data;
  return regeneratorRuntime.async(function descreaseStock$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(axios.get('/user/logIn'));

        case 2:
          getCurrentUser = _context5.sent;
          data = getCurrentUser.data.cart;
          data.forEach(function _callee(prod) {
            var decreaseStock;
            return regeneratorRuntime.async(function _callee$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    prod.stock = prod.stock - prod.quantity;
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(axios.post('/product/updateStock', prod));

                  case 3:
                    decreaseStock = _context4.sent;

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function redirectToPayment(link) {
  return regeneratorRuntime.async(function redirectToPayment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          window.location.href = link;

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function deleteSell(id) {
  var deleteId;
  return regeneratorRuntime.async(function deleteSell$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(axios.post("/cart/deleteOrder/".concat(id)));

        case 2:
          deleteId = _context7.sent;
          window.location.href = "http://localhost:3000/cart.html";

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
} // lOGOUT


function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context8.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);