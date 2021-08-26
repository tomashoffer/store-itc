"use strict";

function handleAdminLogin() {
  var emailDiv = document.querySelector('.form__email__admin');
  var passDiv = document.querySelector('.form__password__admin');
  var email = emailDiv.children[0].value;
  var password = passDiv.children[0].value;
  ;
  console.log(email, password);
  var admin = {
    email: email,
    password: password
  };
  logInAdministrador(admin);
}

function logInAdministrador(newUser) {
  var response;
  return regeneratorRuntime.async(function logInAdministrador$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post('/user/adminLogIn', newUser));

        case 3:
          response = _context.sent;
          console.log(response);
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

var btnSub = document.querySelector('.btn-submit-admin');
btnSub.addEventListener('click', handleAdminLogin);