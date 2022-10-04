import { PlantAllInfo } from "../../../interafces";
import { paths } from "./paths";
import { api } from "../../../shared";

export const amendPlant = (id: string, body: object) => {
  const path = `${paths.amendPlant}${id}/`;
  return api.patch<PlantAllInfo>(path, body);
};
