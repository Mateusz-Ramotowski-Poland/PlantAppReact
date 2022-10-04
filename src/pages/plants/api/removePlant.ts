import { api } from "../../../shared";
import { paths } from "./paths";

export const removePlant = (id: string) => {
  const path = `${paths.removePlant}${id}/`;
  return api.delete(path);
};
