import { api } from "./api";

export function getUserData() {
  const config = {
    method: "GET",
    headers: {},
  };
  return api.get("/accounts/users/me/", config).catch(() => {});
}
