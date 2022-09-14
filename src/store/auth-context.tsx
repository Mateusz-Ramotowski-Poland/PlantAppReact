import { tokenInterface } from "../interafces";
import { useNavigate } from "react-router-dom";
import { fetchDataPost } from "../functions";

import React, { useCallback, useEffect, useState } from "react";

type authProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (token: tokenInterface) => {},
  logout: () => {},
});

const checkIfLoggedIn = () => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      return fetchDataPost("/accounts/jwt/verify", {
        token: JSON.parse(token).access,
      })
        .then(() => true)
        .catch(() => false);
    }
    return Promise.resolve(false);
  } catch (err: any) {
    console.log(err);
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

  const loginHandler = useCallback((token: tokenInterface) => {
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
