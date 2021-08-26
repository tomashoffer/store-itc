const bcrypt = require('bcrypt');
const { readAllUsers, readAdminUser } = require('../modal/user');

export function encryptPwd(req, res, next){
  const { password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) {
        res.status(500).send('Error Encrypting');
        return
    }
    req.body.password = hash;
    next()
  });
};

export async function compareLogin(req, res, next){
      const { email } = req.body;
      const allUsers = readAllUsers();
      const user = allUsers.find((user) => user.email === email);
    if(user == null){
      return res.status(400).send('Cannot find user');
    }
    try{
       if(await bcrypt.compare(req.body.password, user.password)){
         next()
       }else{
        return res.status(400).send('Incorrect password');
       }
    }catch(err){
        res.status(500).send()
    }
}


export async function compareAdminLogin(req, res, next){
  try{
  const { email } = req.body;
  const { password } = req.body;
  const adminUser = readAdminUser();
  const admin = adminUser.find((user) => user.email === email);
if(admin == null || admin.password != password) {
  return res.status(400).send('Your email or password is incorrect');
} next();
}catch(err){
    res.status(500).send()
}
}