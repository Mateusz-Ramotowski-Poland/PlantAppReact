import { PlantListTiles } from "./components/PlantListTiles";
import { MainNavigation } from "./layout/MainNavigation";

interface Props {}

export const ShowPlantsPage: React.FC = (props: Props) => {
  return (
    <>
      <MainNavigation />
      <PlantListTiles />
    </>
  );
};
