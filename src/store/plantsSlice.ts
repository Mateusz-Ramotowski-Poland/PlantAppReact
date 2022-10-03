import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plant, PlantsState } from "../interafces";
import { api } from "../shared";
import { AppDispatch } from "./rootStore";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    insertMany(state, action: PayloadAction<{ plants: Plant[] }>) {
      state.plants = action.payload.plants;
    },
    add(state, { payload: { plant } }: PayloadAction<{ plant: Plant }>) {
      state.plants.push(plant);
    },
    deleteAll(state) {
      state.plants = [];
    },
    delete(state, action) {
      state.plants = state.plants.filter((el) => el.id !== action.payload.id);
    },
  },
});

export function deletePlant(path: string, plantId: string) {
  return async (dispatch: AppDispatch) => {
    await api.delete(path);
    dispatch(plantsActions.delete({ id: plantId }));
  };
}

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
