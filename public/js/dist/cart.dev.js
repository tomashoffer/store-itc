"use strict";

// async function getUser(){
//     const getUser = await axios('/user/logIn');
//     const data = getUser.data.cart;
//     const role = getUser.data.role;
//     renderTable(data);
// }
// function renderTable(data){
//     const root = document.querySelector(".cart_row");
//     let html = "";
//     data.forEach((prod)=>{
//         html += `<tr>
//         <th scope="row"><img style="height: 6rem; width: 6rem;" src="${prod.productImage}" alt=""></th>
//         <td>${prod.productName}</td>
//         <td>${prod.size}</td>
//         <td>${prod.quantity}</td>
//         <td>${prod.productPrice}</td>
//         <td>${prod.productPrice * prod.quantity}</td>
//         </tr>`
//         totalToPay(prod.productPrice * prod.quantity)
//     });
//     root.innerHTML = html;
// }
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
          dataAllUsers = getAllUsers.data; // console.log(dataAllUsers)

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