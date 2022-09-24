import { useContext, useEffect } from "react";
import { MainNavigation } from "../components/layout/MainNavigation";
import { PlantsList } from "../components/plants/PlantsList";
import { getUserData } from "../shared/api/getUserData";
import { AuthContext } from "../store/authContext";

export const AfterLoginPage = () => {
  const authCtx = useContext(AuthContext);
  const logout = authCtx.logout;
  const setLoggedUserIdId = authCtx.setLoggedUserIdId;

  useEffect(() => {
    getUserData()
      .then((user: any) => {
        console.log("useEffect AfterLoginPage", user);
        setLoggedUserIdId(user.id as string);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MainNavigation />
      <h1>Welcome logged user!</h1>
      <PlantsList />
    </>
  );
};
