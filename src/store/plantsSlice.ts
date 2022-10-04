import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plant, PlantAllInfo, PlantsState } from "../interafces";
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
    water(state, action) {
      const index = state.plants.findIndex((plant) => plant.id === action.payload.id);
      state.plants[index].watering_count = (parseInt(state.plants[index].watering_count) + 1).toString();
    },
  },
});

export function deletePlant(path: string, plantId: string) {
  return (dispatch: AppDispatch) => {
    api.delete(path).then(() => dispatch(plantsActions.delete({ id: plantId })));
  };
}

export function updatePlant(path: string, plantId: string, body: object) {
  return (dispatch: AppDispatch) => {
    api.put<PlantAllInfo>(path, body).then((plant) => {
      dispatch(plantsActions.delete({ id: plantId }));
      dispatch(plantsActions.add({ plant }));
    });
  };
}
export function waterPlant(path: string, id: string) {
  return (dispatch: AppDispatch) => {
    api.post<void>(path).then(() => {
      dispatch(plantsActions.water({ id }));
    });
  };
}

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
