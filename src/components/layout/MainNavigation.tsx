import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";

export const MainNavigation = (props: any) => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const changeFormState = (event: any) => {
    props.changeFormState(event.target.textContent);
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
          <li>
            <button type="button" onClick={changeFormState}>
              add plant
            </button>
          </li>
          <li>
            <button type="button" onClick={changeFormState}>
              update plant
            </button>
          </li>
          <li>
            <button type="button" onClick={changeFormState}>
              show plants
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
