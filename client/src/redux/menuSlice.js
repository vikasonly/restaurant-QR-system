import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../lib/api'
// Fetch all menu items
console.log(api)
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (category, thunkApi) => {
    try {
      const url = category && category !== 'All'
        ? `v1/menu?category=${category}`
        : '/v1/menu';
      
      const res = await api.get(url);
      console.log(res)
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to fetch menu items');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
    allMenuItems: [], // Store all items for filtering
    categories: [],
    loading: false,
    error: null,
    selectedCategory: 'All',
    searchQuery: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMenuItems: (state) => {
      state.menuItems = [];
      state.allMenuItems = [];
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.allMenuItems = action.payload.data;
        
        // Apply search filter if search query exists
        let filteredItems = action.payload.data;
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          filteredItems = action.payload.data.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
          );
        }
        
        state.menuItems = filteredItems;
        
        if (state.selectedCategory === 'All') {
          const uniqueCategories = ['All', ...new Set(action.payload.data.map(item => item.category))];
          state.categories = uniqueCategories;
        }
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
export const { setSelectedCategory, setSearchQuery, clearMenuItems } = menuSlice.actions;




