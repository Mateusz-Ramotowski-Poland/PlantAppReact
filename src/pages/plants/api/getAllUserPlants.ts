import { PlantAllInfo } from "../../../interafces";
import { api } from "../../../shared/api/api";

interface PaginatedList<ListItem> {
  results: ListItem[];
  count: number;
  next: string;
  prev: string;
}

export async function getAllUserPlants(id: string) {
  const config = {
    params: { author: id },
  };

  return await api.get<PaginatedList<PlantAllInfo>>("/plants/", config);
}
