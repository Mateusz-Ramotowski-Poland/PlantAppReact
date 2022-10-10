import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlantsState, RenderPlant } from "../../../interfaces";
import { AppDispatch } from "../../../store/rootStore";
import { amendPlant } from "../api/amendPlant";
import { giveWaterToPlant } from "../api/giveWaterToPlant";
import { removePlant } from "../api/removePlant";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    insertMany(state, action: PayloadAction<{ plants: RenderPlant[] }>) {
      state.plants = action.payload.plants;
    },
    add(state, { payload: { plant } }: PayloadAction<{ plant: RenderPlant }>) {
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
    water(state, action) {
      const index = state.plants.findIndex((plant) => plant.id === action.payload.id);
      state.plants[index].watering_count = (parseInt(state.plants[index].watering_count) + 1).toString();
    },
  },
});

export function deletePlant(id: string) {
  return (dispatch: AppDispatch) => {
    removePlant(id).then(() => dispatch(plantsActions.delete({ id })));
  };
}

export function updatePlant(id: string, body: object) {
  return (dispatch: AppDispatch) => {
    amendPlant(id, body).then((plant) => {
      dispatch(plantsActions.update({ plant }));
    });
  };
}

export function waterPlant(id: string) {
  return (dispatch: AppDispatch) => {
    giveWaterToPlant(id).then(() => {
      dispatch(plantsActions.water({ id }));
    });
  };
}

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
