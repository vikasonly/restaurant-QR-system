import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ===============================
   API BASE URL
================================ */
const API_URL = "http://localhost:3000/api/v1";

/* ===============================
   FETCH CART
================================ */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/cart/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   ADD TO CART
================================ */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity = 1 }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cart/add`, {
        userId,
        menuItemId: productId, // 🔴 MUST match backend
        quantity,
      });
      return res.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   REMOVE FROM CART
================================ */
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cart/remove`, {
        userId,
        menuItemId: productId,
      });
      return res.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   INCREASE QTY
================================ */
export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cart/increase`, {
        userId,
        menuItemId: productId,
      });
      return res.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   DECREASE QTY
================================ */
export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cart/decrease`, {
        userId,
        menuItemId: productId,
      });
      return res.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   CLEAR CART
================================ */
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cart/clear`, { userId });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/* ===============================
   CART SLICE
================================ */
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    totalCartPrice: 0,
    loading: false,
    error: null,
  },

  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.totalCartPrice = 0;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH CART ===== */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
        state.totalCartPrice = action.payload?.totalCartPrice || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD / UPDATE CART ===== */
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(increaseQty.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(decreaseQty.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      /* ===== CLEAR CART ===== */
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalCartPrice = 0;
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
