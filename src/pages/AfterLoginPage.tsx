import { useContext, useEffect, useState } from "react";
import { MainNavigation } from "../components/layout/MainNavigation";
import { PlantsList } from "../components/plants/PlantsList";
import { getAllUserPlants } from "../shared/api/getAllUserPlants";
import { getUserData } from "../shared/api/getUserData";
import { AuthContext } from "../store/authContext";

export const AfterLoginPage = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const authCtx = useContext(AuthContext);

  const setLoggedUserIdId = authCtx.setLoggedUserIdId;

  useEffect(() => {
    getUserData()
      .then((user: any) => {
        console.log(user);
        setLoggedUserIdId(user.id as string);
        localStorage.setItem("userId", user.id);
        getAllUserPlants(user.id)
          .then((plants: any) => {
            setPlants(plants.results);
          })
          .catch((err) => {
            setHttpError(err);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MainNavigation />
      <h1>Welcome logged user!</h1>
      <PlantsList httpError={httpError} isLoading={isLoading} plants={plants} />
    </>
  );
};
