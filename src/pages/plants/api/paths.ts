import { Plant } from "../../../interafces";

export const paths = {
  addPlant: "/plants/",
  amendPlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
  getPlants: "/plants/",
  removePlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
};
