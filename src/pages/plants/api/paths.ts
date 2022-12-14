import { RenderPlant } from "../../../interfaces";

export const paths = {
  addPlant: "/plants/",
  amendPlant: (plantId: RenderPlant["id"]) => `/plants/${plantId}/`,
  getPlants: "/plants/",
  getSpecies: `/plants/species/`,
  getWebsocketUrl: "/plants/reports/new",
  getPlantsReports: "/plants/reports/",
  giveWaterToPlant: (plantId: RenderPlant["id"]) => `/plants/${plantId}/water/`,
  removePlant: (plantId: RenderPlant["id"]) => `/plants/${plantId}/`,
};
