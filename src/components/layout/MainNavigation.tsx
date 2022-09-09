import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

export const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.login(authCtx.token);
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {authCtx.isLoggedIn && <button onClick={authCtx.logout}>Logout</button>}
            {!authCtx.isLoggedIn && <button onClick={logoutHandler}>Login</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};
