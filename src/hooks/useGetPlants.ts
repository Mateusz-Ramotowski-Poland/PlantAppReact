import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorMessages } from "../shared";
import { getAllUserPlants, getUserData } from "../shared/api";
import { AuthContext } from "../store/authContext";
import { useAppDispatch } from "../store/hooks";
import { plantsActions } from "../store/plantsSlice";

export function useGetPlants() {
  const [isFetchDataError, setIsFetchDataError] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const setLoggedUserId = authCtx.setLoggedUserId;
  const dispatch = useAppDispatch();

  function getPlants() {
    getUserData()
      .then((user) => {
        console.log(user);
        setLoggedUserId(user.id);
        localStorage.setItem("userId", user.id);
        getAllUserPlants(user.id)
          .then((plants) => {
            console.log(plants);
            console.log(plants.results);
            dispatch(plantsActions.insertMany({ plants: plants.results }));
            navigate("/logged/showPlants");
            console.log("eewgwertwttewtewwe");
          })
          .catch((err) => {
            setIsFetchDataError(true);
            showErrorMessages(err);
          });
      })
      .catch((err) => {
        setIsFetchDataError(true);
        showErrorMessages(err);
      })
      .finally(() => setIsDataLoading(false));
  }

  return { getPlants: getPlants, isFetchDataError: isFetchDataError, isDataLoading: isDataLoading };
}
