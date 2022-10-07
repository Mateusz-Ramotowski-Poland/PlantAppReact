import { api, RequestConfig } from "../../../shared";
import { PaginatedList } from "../interfaces/interfaces";
import { paths } from "./paths";

interface Species {
  id: number;
  name: string;
}

export function getSpiecies(config: RequestConfig) {
  return api.get<PaginatedList<Species>>(paths.getSpecies, config);
}
