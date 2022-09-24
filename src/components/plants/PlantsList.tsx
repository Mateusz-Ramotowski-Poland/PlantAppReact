import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { getAllUserPlants } from "../../shared/api/getAllUserPlants";

export const PlantsList = () => {
  const loggedUserId = useContext(AuthContext).loggedUserId;
  const [plants, setPlants] = useState(); // TODo write initial value

  useEffect(() => {
    getAllUserPlants(loggedUserId)
      .then((plants: any) => {
        setPlants(plants);
        console.log("useEffect PlantList", plants);
      })
      .catch((err) => console.log(err));
  }, []);

  return <p>plant list</p>;
};
