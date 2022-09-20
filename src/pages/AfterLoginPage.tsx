import { useState } from "react";
import { MainNavigation } from "../components/layout/MainNavigation";
import { AddPlantForm } from "../components/plantForms/AddPlantForm";
import { UpdatePlantForm } from "../components/plantForms/UpdatePlantForm";
import { PlantsList } from "../components/plants/PlantsList";

export const AfterLoginPage = () => {
  const [formState, setFormState] = useState("show plants");

  return (
    <>
      <MainNavigation changeFormState={setFormState} />
      <h1>Welcome logged user!</h1>
      {formState === "show plants" && <PlantsList />}
      {formState === "add plant" && <AddPlantForm />}
      {formState === "update plant" && <UpdatePlantForm />}
    </>
  );
};
