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
});

function tryRefreshToken(tokenObj: TokenInterface) {
  return api
    .post(
      "/accounts/jwt/refresh/",
      { refresh: tokenObj.refresh },
      { Authorization: tokenObj.refresh }
    )
    .then((token) => {
      localStorage.setItem("token", JSON.stringify(token));
      return true;
    })
    .catch(() => {
      return false;
    });
}

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
          return tryRefreshToken(tokenObj);
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

  useEffect(() => {
    checkIfLoggedIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");

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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
