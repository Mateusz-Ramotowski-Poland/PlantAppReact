import { api } from "./api";

export async function getAllUserPlants(id: any) {
  const params = new URLSearchParams([["author", id]]).toString();
  const url = "/plants/?" + params;
  const data = await api.get(url);
  console.log(data);
}
