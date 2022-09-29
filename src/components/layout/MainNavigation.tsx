import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { Link } from "react-router-dom";

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
          <Link to={"/logged/updatePlantForm"}>
            <button type="button">update plant</button>
          </Link>
          <Link to={"/logged/showPlants"}>
            <button type="button">show plants</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
