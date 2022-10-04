import "./App.css";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { CreateAccountPage } from "./pages/auth/CreateAccountPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AfterLoginPage } from "./pages/auth/AfterLoginPage";
import { useContext } from "react";
import { AuthContext } from "./store/authContext";
import { RetrievePasswordFormPage } from "./pages/auth/RetrievePasswordFormPage";
import { PasswordResetPage } from "./pages/auth/PasswordResetPage";
import { ActivateAccountPage } from "./pages/auth/ActivateAccountPage";
import { AddPlantFormPage } from "./pages/plants/AddPlantFormPage";
import { UpdatePlantFormPage } from "./pages/plants/UpdatePlantFormPage";
import { ShowPlantsPage } from "./pages/plants/ShowPlantsPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      <Route path="/retrievePassword" element={<RetrievePasswordFormPage />} />
      <Route path="/reset-password/:uid/:token" element={<PasswordResetPage />} />
      <Route path="activate-account/:uid/:token" element={<ActivateAccountPage />} />
      {authCtx.isLoggedIn && <Route path="/logged" element={<AfterLoginPage />} />}
      {authCtx.isLoggedIn && <Route path="/logged/addPlantForm" element={<AddPlantFormPage />} />}
      {authCtx.isLoggedIn && <Route path="/logged/showPlants" element={<ShowPlantsPage />} />}
      {authCtx.isLoggedIn && <Route path="/logged/updatePlantForm" element={<UpdatePlantFormPage />} />}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
