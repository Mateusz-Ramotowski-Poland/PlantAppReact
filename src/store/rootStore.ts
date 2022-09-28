import { configureStore } from "@reduxjs/toolkit";
import { plantsReducer } from "./plantsSlice";

export const rootStore = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});
