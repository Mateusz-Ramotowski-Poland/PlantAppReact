import { configureStore } from "@reduxjs/toolkit";
import { plantsReducer } from "../pages/plants/store/plantsSlice";

export const rootStore = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});

export type AppDispatch = typeof rootStore.dispatch;
export type RootState = ReturnType<typeof rootStore.getState>;
