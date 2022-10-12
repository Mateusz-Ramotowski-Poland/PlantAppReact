import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/authContext";

export const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <h2>Plant App</h2>
          </li>
          <li>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </li>
          <Link to={"/logged/addPlantForm"}>
            <button type="button">add plant</button>
          </Link>
          <Link to={"/logged/statistics"}>
            <button type="button">statistics</button>
          </Link>
          <Link to={"/logged/showPlants"}>
            <button type="button">show plants</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
