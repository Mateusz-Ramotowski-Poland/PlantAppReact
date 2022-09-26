import { api } from "./api";

export async function getAllUserPlants(id: string) {
  const config = {
    method: "GET",
    params: { author: id },
    headers: {},
    id: id,
  };

  return await api.get("/plants/", config);
}
