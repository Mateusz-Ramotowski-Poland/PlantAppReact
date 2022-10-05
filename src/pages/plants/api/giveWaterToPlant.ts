import { api } from "../../../shared";
import { paths } from "./paths";

export function giveWaterToPlant(id: string) {
  return api.post<void>(paths.giveWaterToPlant(id));
}
