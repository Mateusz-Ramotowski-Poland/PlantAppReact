import "./App.css";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { NotFound } from "./pages/NotFound";
import { AfterLoginPage } from "./pages/AfterLoginPage";
import { useContext } from "react";
import { AuthContext } from "./store/authContext";
import { RetrievePasswordFormPage } from "./pages/RetrievePasswordFormPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { ActivateAccountPage } from "./pages/ActivateAccountPage";
import { AddPlantFormPage } from "./pages/AddPlantFormPage";
import { UpdatePlantFormPage } from "./pages/UpdatePlantFormPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      <Route path="/retrievePassword" element={<RetrievePasswordFormPage />} />
      <Route
        path="/reset-password/:uid/:token"
        element={<PasswordResetPage />}
      />
      <Route
        path="activate-account/:uid/:token"
        element={<ActivateAccountPage />}
      />
      {authCtx.isLoggedIn && (
        <Route path="/logged" element={<AfterLoginPage />} />
      )}
      <Route path="/logged/addPlantForm" element={<AddPlantFormPage />} />
      <Route path="/logged/updatePlantForm" element={<UpdatePlantFormPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
