import express from 'express';
import {
  addToCart,
  getUserCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/cart/:userId', getUserCart);
router.post('/cart/remove', removeFromCart);
router.post('/cart/increase', increaseQuantity);
router.post('/cart/decrease', decreaseQuantity);
router.post('/cart/clear', clearCart);

export default router;
