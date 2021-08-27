export {};
// REQUIRES
const express = require("express");
const router = express.Router();
import { schemaUsers, schemaLogIn, schemaAdminLogIn } from '../schema/schemaUser';
import { validateUser } from '../middleware/validateUser';
import { doesUserExist } from '../middleware/userExist';
import { encryptPwd, compareLogin } from '../middleware/encriptPsw';
import { sendCookieUser, logOutUser } from '../middleware/sendCookie';



// CONTROLLERS
import { registerUser, logInUser, getAllUsers} from "../controllers/userControllers";

router.post('/register', validateUser(schemaUsers), doesUserExist, encryptPwd, registerUser);
router.post('/logIn', validateUser(schemaLogIn), compareLogin, sendCookieUser, logInUser)
router.get('/logIn', logInUser)
router.get('/logOut', logOutUser)
router.get('/allUsers', getAllUsers)


module.exports = router;
