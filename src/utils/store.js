import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice"; 

export const store = configureStore({
  reducer: {
    api: apiReducer,
    search: searchReducer,
    cart: cartReducer, 
  },
});
