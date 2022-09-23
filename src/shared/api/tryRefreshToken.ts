import { TokenInterface } from "../../interafces";
import { api } from "./api";

export function tryRefreshToken(tokenObj: TokenInterface) {
  return api
    .post(
      "/accounts/jwt/refresh/",
      { refresh: tokenObj.refresh },
      { Authorization: tokenObj.access }
    )
    .then((token) => {
      localStorage.setItem("token", JSON.stringify(token));
    })
    .catch((err) => {
      throw new Error(err);
    });
}
