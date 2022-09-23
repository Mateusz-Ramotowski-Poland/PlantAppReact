import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { getUserData } from "../../shared/api/getUserData";
import { getAllUserPlants } from "../../shared/api/getAllUserPlants";

export const PlantsList = () => {
  const logout = useContext(AuthContext).logout;
  const [plants, setPlants] = useState(); // TODo write initial value

  useEffect(() => {
    getUserData(logout)
      .then((userData: any) => {
        getAllUserPlants(userData.id as string);
      })
      .catch((err) => console.log(err));
  }, []);

  return <p>plant list</p>;
};
