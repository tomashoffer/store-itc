const { readAllUsers } = require('../modal/user');

export function doesUserExist(req, res, next){
    try{
        const { email } = req.body;
        const allUsers = readAllUsers();
        const user = allUsers.find((user) => user.email === email);
    if (user) {
        res.status(400).send('User Already Exist');
        return;
        }
    next();
    }catch (err) {
        console.error(err)
    }
};
