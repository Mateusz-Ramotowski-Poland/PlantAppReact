import { api } from "./api";

export async function getAllUserPlants(id: string) {
  const config = {
    params: { author: id },
  };

  return await api.get("/plants/", config);
}
