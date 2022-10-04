import { api } from "../../../shared";
import { paths } from "./paths";

export const removePlant = (id: string) => {
  return api.delete(paths.removePlant(id));
};
