import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Plant, PlantsState } from "../interafces";
import { api } from "../shared";

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    insertMany(state, action) {
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

export function deletePlant(path: string, plantId: string, closeModal: () => void) {
  return (dispatch: (arg0: { payload: any; type: string }) => AnyAction) => {
    api.delete(path).then(() => {
      dispatch(plantsActions.delete({ id: plantId }));
      closeModal();
    });
  };
}

export const plantsActions = plantsSlice.actions;

export const plantsReducer = plantsSlice.reducer;
