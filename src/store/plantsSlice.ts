import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plant, PlantsState } from "../interafces";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    fetch(state, action) {
      state.plants = action.payload.plants;
    },
    add(state, { payload: { plant } }: PayloadAction<{ plant: Plant }>) {
      state.plants.push(plant);
    },
    deleteAll(state) {
      state.plants = [];
    },
  },
});

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
