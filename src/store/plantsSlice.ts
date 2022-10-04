import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlantAllInfo, PlantsState } from "../interafces";
import { api } from "../shared";
import { AppDispatch } from "./rootStore";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    insertMany(state, action: PayloadAction<{ plants: PlantAllInfo[] }>) {
      state.plants = action.payload.plants;
    },
    add(state, { payload: { plant } }: PayloadAction<{ plant: PlantAllInfo }>) {
      state.plants.push(plant);
    },
    deleteAll(state) {
      state.plants = [];
    },
    delete(state, action) {
      state.plants = state.plants.filter((el) => el.id !== action.payload.id);
    },
    update(state, action) {
      const index = state.plants.findIndex((plant) => plant.id === action.payload.id);
      state.plants.splice(index, 1, action.payload.plant);
    },
  },
});

export function deletePlant(path: string, plantId: string) {
  return (dispatch: AppDispatch) => {
    api.delete(path).then(() => dispatch(plantsActions.delete({ id: plantId })));
  };
}

export function updatePlant(path: string, body: object) {
  return (dispatch: AppDispatch) => {
    api.patch<PlantAllInfo>(path, body).then((plant) => {
      dispatch(plantsActions.update({ plant }));
    });
  };
}

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
