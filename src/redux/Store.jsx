import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice.jsx';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools: true
})