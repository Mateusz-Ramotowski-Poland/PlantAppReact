import { PlantAllInfo } from "../../../interafces";
import { api } from "../../../shared";
import { PaginatedList } from "../interfaces/interfaces";
import { paths } from "./paths";

export async function getAllUserPlants(id: string) {
  const config = {
    params: { author: id },
  };

  return await api.get<PaginatedList<PlantAllInfo>>(paths.getPlants, config);
}
