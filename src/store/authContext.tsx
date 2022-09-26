import { TokenInterface } from "../interafces";
import { useNavigate } from "react-router-dom";
import { api } from "../shared";

import React, { useCallback, useEffect, useState } from "react";

type authProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (token: TokenInterface) => {},
  logout: () => {},
  loggedUserId: "",
  setLoggedUserIdId: (user: string) => {},
});

const checkIfLoggedIn = () => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      const tokenObj: TokenInterface = JSON.parse(token);
      return api
        .post("/accounts/jwt/verify", {
          token: tokenObj.access,
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          console.log("hello!");
          return false;
        });
    }
    return Promise.resolve(false);
  } catch (err: any) {
    return Promise.resolve(false);
  }
};

export const AuthContextProvider = (props: authProps) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserIdId] = useState("");

  useEffect(() => {
    checkIfLoggedIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setLoggedUserIdId("");

    navigate("/");
  }, []);

  const loginHandler = useCallback((token: TokenInterface) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(token));
    navigate("/logged");
  }, []);

  const contextValue = {
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    loggedUserId: loggedUserId,
    setLoggedUserIdId: setLoggedUserIdId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
