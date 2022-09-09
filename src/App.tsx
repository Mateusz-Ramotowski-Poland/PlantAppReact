import "./App.css";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { NotFound } from "./pages/NotFound";
import { AfterLoginPage } from "./pages/AfterLoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/logged" element={<AfterLoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
