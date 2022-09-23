import { TokenInterface } from "../../interafces";
import { api } from "./api";
import { tryRefreshToken } from "./tryRefreshToken";

export function getUserData(logout: () => void) {
  return api
    .get("/accounts/users/me/")
    .then((userData) => userData)
    .catch(() => {
      const token: string | null = localStorage.getItem("token");
      if (token) {
        const tokenObj: TokenInterface = JSON.parse(token);
        return tryRefreshToken(tokenObj)
          .then(() => {
            return api.get("/accounts/users/me/");
          })
          .catch(() => {
            logout();
            throw { message: "Page can't display plants" };
          });
      }
      throw { message: "Page can't display plants" };
    });
}
