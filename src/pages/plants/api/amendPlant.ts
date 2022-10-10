import { ApiPlant } from "../../../interfaces";
import { paths } from "./paths";
import { api } from "../../../shared";

export const amendPlant = (id: string, body: object) => {
  return api.patch<ApiPlant>(paths.amendPlant(id), body);
};
