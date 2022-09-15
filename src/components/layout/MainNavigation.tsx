import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";

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
        </ul>
      </nav>
    </header>
  );
};
