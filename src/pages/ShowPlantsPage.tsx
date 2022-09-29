import { MainNavigation } from "../components/layout/MainNavigation";
import { PlantsList } from "../components/plants/PlantsList";
import classes from "./ShowPlantsPage.module.css";

export const ShowPlantsPage = () => {
  return (
    <>
      <MainNavigation />
      <h1 className={classes.title}>Your plants</h1>
      <PlantsList />
    </>
  );
};
