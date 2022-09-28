import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorMessages } from "../shared";
import { getAllUserPlants, getUserData } from "../shared/api";
import { AuthContext } from "../store/authContext";
import { plantsActions } from "../store/plantsSlice";

export function useGetPlants() {
  const [isFetchDataError, setIsFetchDataError] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const setLoggedUserId = authCtx.setLoggedUserId;
  const dispatch = useDispatch();

  function getPlants() {
    getUserData()
      .then((user: any) => {
        setLoggedUserId(user.id as string);
        localStorage.setItem("userId", user.id);
        getAllUserPlants(user.id)
          .then((plants: any) => {
            dispatch(plantsActions.add(plants.results));
            navigate("/logged/showPlants");
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
