import { Plant } from "../../../interafces";

export const paths = {
  addPlant: "/plants/",
  amendPlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
  getPlants: "/plants/",
  getSpecies: `/plants/species/`,
  giveWaterToPlant: (plantId: Plant["id"]) => `/plants/${plantId}/water/`,
  removePlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
};
