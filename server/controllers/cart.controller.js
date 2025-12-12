import Cart from '../models/cart.js';
import Menu from '../models/menu.js';
export const addToCart = async (req, res) => {
  try {
    const { menuItemId, userId, quantity = 1 } = req.body;

   
    let cart = await Cart.findOne({ userId });
   
    if (!cart) {
      cart = new Cart({ userId, items: [], totalCartPrice: 0 });
    }

   

    let menu = await Menu.findById(menuItemId);
    if (!menu) {
      res.send('no menu item found');
    }
   

    const existingMenuItemInCart = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );
    console.log(existingMenuItemInCart);
    
    if (!existingMenuItemInCart) {
      cart.items.push({ menuItemId, quantity });
    } else {
      existingMenuItemInCart.quantity += 1;
    }

    cart.totalCartPrice = cart.items.reduce((acc, item) => {
      return acc + item.quantity * menu.price;
    }, 0);
    await cart.save();

    res.status(201).json({
      message: 'Items added to cart successfully',
    });
  } catch (error) {}
};
