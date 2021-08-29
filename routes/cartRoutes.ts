export {};
// REQUIRES
const express = require("express");
const router = express.Router();

import {  } from '../middleware/sendCookie';



// CONTROLLERS
import { getOrder, deleteOrder } from "../controllers/cartControllers";

router.post('/postOrder', getOrder);
router.post('/deleteOrder/:id', deleteOrder);



module.exports = router;
