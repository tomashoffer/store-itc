export {};
// REQUIRES
const express = require("express");
const router = express.Router();

import {  } from '../middleware/sendCookie';



// CONTROLLERS
import { getOrder } from "../controllers/cartControllers";

router.post('/postOrder', getOrder);



module.exports = router;
