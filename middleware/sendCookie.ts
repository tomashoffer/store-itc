const { readAllUsers, readAdminUser } = require('../modal/user');

export function sendCookieUser(req, res, next) {
      const { email } = req.body;
      const allUsers = readAllUsers();
      const user = allUsers.find((user) => user.email === email);  
      const cookie = user.id;  
      res.cookie('userIdLogIn', cookie, { maxAge: 900000000000, httpOnly: true });
      console.log(user)

    next();
  };
// export function sendCookieAdmin(req, res, next) {
//     if (!req.cookies.adminLogIn) {
//        const { email } = req.body;
//        const allAdmin = readAdminUser();
//        const admin = allAdmin.find((user) => user.email === email);  
//       res.cookie('adminLogIn', JSON.stringify(admin), { maxAge: 900000, httpOnly: true });
//     }
//     next();
//   };

export function selectedProd(req, res, next){
    const { id } = req.params;
    res.cookie("idProdSelected", id, { maxAge: 300000000, httpOnly: true });
    next();
}

export function editProdCookie(req, res, next){
  const { id } = req.params;
    res.cookie("idEditProd", id, { maxAge: 300000000, httpOnly: true });
    res.send({ok:'succes'})
}
