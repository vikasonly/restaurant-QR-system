import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Auth user
  const userId = useSelector((state) => state.auth.user?._id);

  // ✅ Cart state
  const { items, totalCartPrice } = useSelector((state) => state.cart);

  // ✅ Total items
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // ✅ Empty cart
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white text-black rounded-lg"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-400">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = item.menuItemId;

            return (
              <div
                key={product._id}
                className="bg-gray-900 border border-gray-800 rounded-lg"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-40 h-40">
                    <img
                      src={product.image || "/no-image.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-white">
                          {product.name}
                        </h3>
                        <span className="text-white font-bold">
                          ₹{product.price}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQty({
                                userId,
                                productId: product._id,
                              })
                            )
                          }
                          className="p-2 bg-gray-800 rounded"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="text-white font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQty({
                                userId,
                                productId: product._id,
                              })
                            )
                          }
                          className="p-2 bg-gray-800 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              userId,
                              productId: product._id,
                            })
                          )
                        }
                        className="text-red-400"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{totalCartPrice}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>GST (18%)</span>
              <span>₹{Math.round(totalCartPrice * 0.18)}</span>
            </div>

            <div className="border-t border-gray-700 pt-3 flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-white font-bold">
                ₹{totalCartPrice + Math.round(totalCartPrice * 0.18)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-white text-black py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
