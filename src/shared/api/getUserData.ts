import { api } from "./api";

export function getUserData() {
  return api
    .get("/accounts/users/me/")
    .then((userData) => userData)
    .catch(() => {});
}
