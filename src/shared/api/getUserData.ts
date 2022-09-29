import { api } from "./api";

interface User {
  id: string;
}

export function getUserData() {
  return api.get<User>("/accounts/users/me/");
}
