import { Plant } from "../../../interafces";

export const paths = {
  addPlant: "/plants/",
  amendPlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
  getPlants: "/plants/",
  getSpecies: (config: string[][]) => {
    const params = new URLSearchParams(config).toString();
    return `/plants/species/?${params}`;
  },
  giveWaterToPlant: (plantId: Plant["id"]) => `/plants/${plantId}/water/`,
  removePlant: (plantId: Plant["id"]) => `/plants/${plantId}/`,
};
