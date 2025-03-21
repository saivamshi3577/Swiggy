import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    search: searchReducer,
  },
});
