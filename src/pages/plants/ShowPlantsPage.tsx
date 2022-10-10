import { MainNavigation } from "./layout/MainNavigation";
import { PlantsList } from "./components/PlantsList";
import classes from "./ShowPlantsPage.module.css";
import { useEffect, useMemo, useState } from "react";
import { getWateringStatus, sortPlantArray } from "./components/helpers";
import { plantsActions } from "./store/plantsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetPlants } from "./hooks/useGetPlants";
import { PlantsState } from "../../interfaces";

interface State {
  plants: PlantsState;
}

export const ShowPlantsPage = () => {
  const dispatch = useAppDispatch();
  const [isShowSortOptions, setIsShowSortOptions] = useState(false);
  const [wateringCounter, setWateringCounter] = useState(0);

  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state: State) => state.plants.plants);

  const wateringStatuses: string[] = useMemo(() => {
    return plants.map((plant) => getWateringStatus(plant.next_watering));
  }, [wateringCounter]);

  useEffect(() => {
    if (plants.length === 0) {
      getPlants();
    }
  }, []);

  function buttonClickHandler() {
    setIsShowSortOptions((prev) => !prev);
  }

  function sortPlants(sortOrder: "descending" | "ascending", byPropertyName: "name" | "watering_interval" | "next_watering") {
    const sortedArray = sortPlantArray(plants, sortOrder, byPropertyName);
    dispatch(plantsActions.insertMany({ plants: sortedArray }));
  }

  const sortingOptions = (
    <>
      <button type="button" onClick={sortPlants.bind(null, "ascending", "name")}>
        Sort by name: ascending
      </button>
      <button type="button" onClick={sortPlants.bind(null, "descending", "name")}>
        Sort by name: descending
      </button>
      <button type="button" onClick={sortPlants.bind(null, "ascending", "watering_interval")}>
        Sort by watering interval: ascending
      </button>
      <button type="button" onClick={sortPlants.bind(null, "descending", "watering_interval")}>
        Sort by watering interval: descending
      </button>
      <button type="button" onClick={sortPlants.bind(null, "ascending", "next_watering")}>
        Sort by next watering: ascending
      </button>
      <button type="button" onClick={sortPlants.bind(null, "descending", "next_watering")}>
        Sort by next watering: descending
      </button>
    </>
  );

  return (
    <>
      <MainNavigation />
      <h1 className={classes.title}>
        Your plants{" "}
        <button type="button" onClick={buttonClickHandler}>
          Sort By
        </button>
        {isShowSortOptions && sortingOptions}
      </h1>
      <PlantsList plants={plants} wateringStatuses={wateringStatuses} setWateringCounter={setWateringCounter} />
    </>
  );
};
