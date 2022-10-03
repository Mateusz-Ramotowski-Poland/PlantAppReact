import { AuthToken } from "../interafces";
import { useNavigate } from "react-router-dom";
import { api } from "../shared";

import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { errorEvents } from "../shared/api/helpers";
import { useAppDispatch } from "./hooks";
import { plantsActions } from "./plantsSlice";

type AuthProps = {};

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (token: AuthToken) => {},
  logout: () => {},
  loggedUserId: "",
  setLoggedUserId: (user: string) => {},
});

const checkIfLoggedIn = () => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      const tokenObj: AuthToken = JSON.parse(token);
      const body = { token: tokenObj.access };

      return api
        .post("/accounts/jwt/verify", body)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
    return Promise.resolve(false);
  } catch {
    return Promise.resolve(false);
  }
};

export const AuthContextProvider = (props: PropsWithChildren<AuthProps>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState("");

  useEffect(() => {
    checkIfLoggedIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, []);

  useEffect(() => {
    errorEvents.push((data: string) => {
      if (data === "refreshTokenFailed") {
        logoutHandler();
      }
    });
  }, []);

  useEffect(() => {
    setLoggedUserId(localStorage.getItem("userId") as string);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setLoggedUserId("");
    dispatch(plantsActions.deleteAll());

    navigate("/");
  }, []);

  const loginHandler = useCallback((token: AuthToken) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(token));
    navigate("/logged");
  }, []);

  const contextValue = {
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    loggedUserId: loggedUserId,
    setLoggedUserId: setLoggedUserId,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
