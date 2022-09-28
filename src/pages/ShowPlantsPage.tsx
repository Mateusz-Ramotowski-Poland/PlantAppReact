import { MainNavigation } from "../components/layout/MainNavigation";
import { PlantsList } from "../components/plants/PlantsList";

export const ShowPlantsPage = () => {
  return (
    <>
      <MainNavigation />
      <h1>Welcome logged user!</h1>
      <PlantsList />
    </>
  );
};
