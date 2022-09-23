import React from "react";
import { TokenInterface } from "../../interafces";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { api } from "../../shared";

interface Params {
  author?: string;
  species?: string;
  sun_exposure?: number;
  temperature?: number;
  search?: string;
  ordering?: string;
  page?: number;
}

function tryRefreshToken(tokenObj: TokenInterface) {
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

function getUserData(logout: () => void) {
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

async function getAllUserPlants(id: any) {
  const params = new URLSearchParams([["author", id]]).toString();
  const url = "/plants/?" + params;
  const data = await api.get(url);
  console.log(data);
}

export const PlantsList = () => {
  const logout = useContext(AuthContext).logout;

  getUserData(logout)
    .then((userData: any) => {
      getAllUserPlants(userData.id as string);
    })
    .catch((err) => console.log(err));

  return <p>plant list</p>;
};
