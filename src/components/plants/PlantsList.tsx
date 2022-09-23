import React from "react";
import { TokenInterface } from "../../interafces";
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
      { Authorization: tokenObj.refresh }
    )
    .then((token) => {
      localStorage.setItem("token", JSON.stringify(token));
      return true;
    })
    .catch(() => {
      return false;
    });
}

function getUserData() {
  api
    .get("/accounts/users/me/")
    .then((userData) => userData)
    .catch(() => {
      const token: string | null = localStorage.getItem("token");
      if (token) {
        const tokenObj: TokenInterface = JSON.parse(token);
        tryRefreshToken(tokenObj);
      }
    });
}

async function getAllUserPlants(id: any) {
  const params = new URLSearchParams([["author", id]]).toString();
  const url = "/plants/?" + params;
  const data = await api.get(url);
  console.log(data);
}

export const PlantsList = () => {
  /* const params = { author: "admin" }; // get author from....token?
  const plantsData = api.get("/plants/"); // I will  get promise */
  getUserData()
    .then((userData: any) => {
      getAllUserPlants(userData.id as string);
    })
    .catch(() => {});

  return <p>plant list</p>;
};
