import express from 'express';
import { createOrder, verifyPayment } from '../controllers/order.controller.js';
import checkGuestOrUser from '../middlewares/checkGuestAndUser.js';
const router = express.Router();

router.post('/orders', checkGuestOrUser, createOrder);
router.post('/verify/payment' , verifyPayment)
export default router;