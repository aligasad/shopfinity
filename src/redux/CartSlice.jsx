import { createSlice } from "@reduxjs/toolkit";

// jab cart item me koi data nahi hoga to empty array dikhega aur data hoga to whi show karega
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    }
  }
});

//exporting these function to make global fn.
export const {addToCart, deleteFromCart} = cartSlice.actions;

export default cartSlice.reducer;