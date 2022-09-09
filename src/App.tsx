import "./App.css";
import { LoginForm } from "./components/forms/LoginForm";
import { MainNavigation } from "./components/layout/MainNavigation";

function App() {
  return (
    <div>
      <MainNavigation />
      <LoginForm />
    </div>
  );
}

export default App;
