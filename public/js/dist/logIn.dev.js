"use strict";

function handleLogin() {
  var emailDiv = document.querySelector('.form__email');
  var passDiv = document.querySelector('.form__password');
  var email = emailDiv.children[0].value;
  var password = passDiv.children[0].value;
  ;
  console.log(email, password);
  var userLogIn = {
    email: email,
    password: password
  };
  logIn(userLogIn);
}

var btnSub = document.querySelector('.btn-submit');
btnSub.addEventListener('click', handleLogin);

function logIn(userLogIn) {
  var response;
  return regeneratorRuntime.async(function logIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post('/user/logIn', userLogIn));

        case 3:
          response = _context.sent;
          window.location.href = "/index.html";
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.response);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}