import { TokenInterface } from "../../interafces";
import { fetchData } from "./api";

export function tryRefreshToken(tokenObj: TokenInterface) {
  const url = `${process.env.REACT_APP_DOMAIN as string}/accounts/jwt/refresh/`;
  const headers = new Headers({
    Authorization: tokenObj.access,
    "Content-Type": "application/json",
  });
  const body = JSON.stringify({ refresh: tokenObj.refresh });
  return fetchData(url, headers, body).then((res) => {
    if (res.status === 204) return res.text();
    const token = res.json();
    if (res.ok) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      throw new Error("Error while refreshing token");
    }
  });
}
