import mongoose from 'mongoose';

const cartScehma = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', 
      },
      quantity: {
        type: Number,
    
      }, 
    },
  ],
  totalCartPrice: {
    type: Number,
  }, 
});

const Cart = mongoose.model('Cart', cartScehma);

export default Cart;