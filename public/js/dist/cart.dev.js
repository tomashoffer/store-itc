"use strict";

function renderTable() {
  var getCurrentUser, data, role, getAllUsers, dataAllUsers, root, html;
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
          console.log(role);
          _context.next = 8;
          return regeneratorRuntime.awrap(axios('/user/allUsers'));

        case 8:
          getAllUsers = _context.sent;
          dataAllUsers = getAllUsers.data;
          root = document.querySelector(".cart_row");
          html = "";

          if (role === "admin") {
            dataAllUsers.forEach(function (user) {
              var allCarts = user.cart;
              allCarts.forEach(function (cart) {
                html += "<tr>\n            <th scope=\"row\"><img style=\"height: 6rem; width: 6rem;\" src=\"".concat(cart.productImage, "\" alt=\"\"></th>\n            <td>").concat(cart.productName, "</td>\n            <td>").concat(cart.size, "</td>\n            <td>").concat(cart.quantity, "</td>\n            <td>").concat(cart.productPrice, "</td>\n            <td>").concat(cart.productPrice * cart.quantity, "</td>\n            </tr>");
                totalToPay(cart.productPrice * cart.quantity);
              });
            });
          } else {
            data.forEach(function (prod) {
              html += "<tr>\n            <th scope=\"row\"><img style=\"height: 6rem; width: 6rem;\" src=\"".concat(prod.productImage, "\" alt=\"\"></th>\n            <td>").concat(prod.productName, "</td>\n            <td>").concat(prod.size, "</td>\n            <td>").concat(prod.quantity, "</td>\n            <td>").concat(prod.productPrice, "</td>\n            <td>").concat(prod.productPrice * prod.quantity, "</td>\n            </tr>");
              totalToPay(prod.productPrice * prod.quantity);
            });
          }

          root.innerHTML = html;

        case 14:
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
            htmlPaypal = "<button style=\"padding: 1rem; font-size: 2.5rem;\" type=\"button\" onclick='handleStock()' class=\"btn btn-warning btn_paypal\">PAY WITH PAYPAL</button>";
          }

          paypal.innerHTML = htmlPaypal;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function handleStock() {
  var getCurrentUser, data;
  return regeneratorRuntime.async(function handleStock$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 2:
          getCurrentUser = _context3.sent;
          data = getCurrentUser.data.cart;
          data.forEach(function (prod) {
            console.log(prod.stock);
            console.log(prod.quantity);
            prod.stock = prod.stock - prod.quantity;
            var decreaseStock = axios.post('/product/updateStock', prod);
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
} // lOGOUT


function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context4.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);