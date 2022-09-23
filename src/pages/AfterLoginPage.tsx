import React from "react";
import { MainNavigation } from "../components/layout/MainNavigation";
import { PlantsList } from "../components/plants/PlantsList";

export const AfterLoginPage = () => {
  return (
    <>
      <MainNavigation />
      <h1>Welcome logged user!</h1>
      <PlantsList />
    </>
  );
};
