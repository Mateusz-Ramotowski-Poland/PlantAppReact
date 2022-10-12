import { MainNavigation } from "./layout/MainNavigation";
import { PlantsList } from "./components/PlantsList";
import classes from "./StatisticsPage.module.css";

export const StatisticsPage = () => {
  return (
    <>
      <MainNavigation />
      <h1 className={classes.title}>Your plants </h1>
      <PlantsList />
    </>
  );
};
