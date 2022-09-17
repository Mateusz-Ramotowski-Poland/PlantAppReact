import "./App.css";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { NotFound } from "./pages/NotFound";
import { AfterLoginPage } from "./pages/AfterLoginPage";
import { useContext } from "react";
import { AuthContext } from "./store/authContext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      {authCtx.isLoggedIn && (
        <Route path="/logged" element={<AfterLoginPage />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
