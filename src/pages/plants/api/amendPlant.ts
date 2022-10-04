import { PlantAllInfo } from "../../../interafces";
import { paths } from "./paths";
import { api } from "../../../shared";

export const amendPlant = (id: string, body: object) => {
  return api.patch<PlantAllInfo>(paths.amendPlant(id), body);
};
