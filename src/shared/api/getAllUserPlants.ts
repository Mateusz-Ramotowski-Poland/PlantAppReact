import { api } from "./api";

export async function getAllUserPlants(id: string) {
  const params = new URLSearchParams([["author", id]]).toString();
  const url = "/plants/?" + params;
  const params = { autor: id };
  return await api.get(url, { params });
}
