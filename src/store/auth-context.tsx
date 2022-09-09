import React, { useState } from "react";
import { tokenInterface } from "../interafces";

type authProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({
  token: { username: "", password: "" },
  isLoggedIn: false,
  login: (token: tokenInterface) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: authProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState({ username: "", password: "" });

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (token: tokenInterface) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(token));
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
