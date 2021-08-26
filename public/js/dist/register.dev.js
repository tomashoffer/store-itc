"use strict";

function handleRegister() {
  try {
    var nameDiv = document.querySelector('.form__user');
    var emailDiv = document.querySelector('.form__email');
    var passDiv = document.querySelector('.form__password');
    var name = nameDiv.children[0].value;
    var email = emailDiv.children[0].value;
    var password = passDiv.children[0].value;
    ;
    console.log(name, email, password);
    var newUser = {
      name: name,
      email: email,
      password: password
    };
    register(newUser);
  } catch (e) {
    console.error(e);
  }
} // QUERY SELECTORS


var btnSub = document.querySelector('.btn-submit'); // EVENTLISTENERS

btnSub.addEventListener('click', handleRegister);

function register(newUser) {
  var response;
  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post('/user/register', newUser));

        case 3:
          response = _context.sent;
          console.log(response);

          if (response.data) {
            window.location.href = "http://localhost:3000/logIn.html";
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.response);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}