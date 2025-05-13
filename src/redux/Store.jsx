import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice.jsx';
import wishlistState from './WishlistSlice.jsx';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistState,
  },
  devTools: true
})