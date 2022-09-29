import { Plant } from "../../interafces";
import { api } from "./api";

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

  return await api.get<PaginatedList<Plant>>("/plants/", config);
}
