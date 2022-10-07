import { PlantAllInfo } from "../../../interfaces";
import { paths } from "./paths";
import { api } from "../../../shared";

export const amendPlant = (id: string, body: object) => {
  return api.patch<PlantAllInfo>(paths.amendPlant(id), body);
};
