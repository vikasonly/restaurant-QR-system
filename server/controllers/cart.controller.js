import Cart from '../models/cart.js';
import Menu from '../models/menu.js';

/**
 * ===============================
 * ADD ITEM TO CART
 * ===============================
 */
export const addToCart = async (req, res) => {
  try {
    const { userId, menuItemId, quantity = 1 } = req.body;

    // 1️⃣ Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalCartPrice: 0,
      });
    }

    // 2️⃣ Check menu item exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // 3️⃣ Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItemId, quantity });
    }

    // 4️⃣ Recalculate total cart price
    let total = 0;
    for (const item of cart.items) {
      const menu = await Menu.findById(item.menuItemId);
      total += menu.price * item.quantity;
    }

    cart.totalCartPrice = total;
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ===============================
 * GET USER CART
 * ===============================
 */
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate('items.menuItemId');

    if (!cart) {
      return res.status(200).json({
        items: [],
        totalCartPrice: 0,
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ===============================
 * REMOVE ITEM FROM CART
 * ===============================
 */
export const removeFromCart = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemId
    );

    // Recalculate total
    let total = 0;
    for (const item of cart.items) {
      const menu = await Menu.findById(item.menuItemId);
      total += menu.price * item.quantity;
    }

    cart.totalCartPrice = total;
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ===============================
 * INCREASE ITEM QUANTITY
 * ===============================
 */
export const increaseQuantity = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    item.quantity += 1;

    const menu = await Menu.findById(menuItemId);
    cart.totalCartPrice += menu.price;

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ===============================
 * DECREASE ITEM QUANTITY
 * ===============================
 */
export const decreaseQuantity = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    const menu = await Menu.findById(menuItemId);

    item.quantity -= 1;
    cart.totalCartPrice -= menu.price;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.menuItemId.toString() !== menuItemId
      );
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ===============================
 * CLEAR CART
 * ===============================
 */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalCartPrice: 0 }
    );

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
