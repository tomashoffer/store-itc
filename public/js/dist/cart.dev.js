"use strict";

function getUser() {
  var getUser, data;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios('/user/logIn'));

        case 2:
          getUser = _context.sent;
          data = getUser.data.cart;
          renderTable(data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderTable(data) {
  var root = document.querySelector(".cart_row");
  var html = "";
  data.forEach(function (prod) {
    html += "<tr>\n        <th scope=\"row\"><img style=\"height: 6rem; width: 6rem;\" src=\"".concat(prod.productImage, "\" alt=\"\"></th>\n        <td>").concat(prod.productName, "</td>\n        <td>").concat(prod.size, "</td>\n        <td>").concat(prod.quantity, "</td>\n        <td>").concat(prod.productPrice, "</td>\n        <td>").concat(prod.productPrice * prod.quantity, "</td>\n        </tr>");
    totalToPay(prod.productPrice * prod.quantity);
  });
  root.innerHTML = html;
}

var currentTotal = 0;

function totalToPay(totalToPay) {
  var total = document.querySelector(".total");
  currentTotal = currentTotal + totalToPay;
  var html = "<p>".concat(currentTotal, "</p>");
  total.innerHTML = html;
  var paypal = document.querySelector(".paypal");
  var htmlPaypal = "<button style=\"padding: 1rem; font-size: 2.5rem;\" type=\"button\" class=\"btn btn-warning\">PAY WITH PAYPAL</button>";
  paypal.innerHTML = htmlPaypal;
} // lOGOUT


function logOut() {
  var logOut;
  return regeneratorRuntime.async(function logOut$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios("/user/logOut"));

        case 2:
          logOut = _context2.sent;
          window.location.href = "http://localhost:3000/";

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var logout = document.querySelector('.logout');
logout.addEventListener('click', logOut);