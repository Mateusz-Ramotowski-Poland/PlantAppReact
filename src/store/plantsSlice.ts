import { createSlice } from "@reduxjs/toolkit";
import { PlantsState } from "../interafces";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    add(state, action) {
      state.plants.push(...action.payload);
    },
    deleteAll(state) {
      state.plants = [];
    },
  },
});

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
