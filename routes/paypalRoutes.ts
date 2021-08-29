export {};

// REQUIRES
const express = require("express");
const router = express.Router();

// CONTROLLERS
import { createPayment, succesPayment, cancelPayment } from "../controllers/paypalController";

router.post('/create-payment/:currentTotal', createPayment);
router.get('/succes', succesPayment);
router.get('/cancel', cancelPayment);


module.exports = router;
