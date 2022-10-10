import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, showErrorMessages } from "../../../shared";
import { AuthContext } from "../../../store/authContext";
import { useAppDispatch } from "../../../store/hooks";
import { getAllUserPlants } from "../api";
import { plantsActions } from "../store/plantsSlice";
import { getWateringStatus } from "../utils";

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
        setLoggedUserId(user.id);
        localStorage.setItem("userId", user.id);
        getAllUserPlants(user.id)
          .then((apiPlants) => {
            const plants = apiPlants.results.map((plant) => {
              return { ...plant, wateringStatus: getWateringStatus(plant.next_watering) };
            });
            dispatch(plantsActions.insertMany({ plants: plants }));
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
