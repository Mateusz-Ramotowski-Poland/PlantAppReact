import classes from "./MainNavigation.module.css";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

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
