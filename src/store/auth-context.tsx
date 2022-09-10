import { tokenInterface } from "../interafces";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type authProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({
  token: { access: "", refresh: "" },
  isLoggedIn: false,
  login: (token: tokenInterface) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: authProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState({ access: "", refresh: "" });

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const loginHandler = (token: tokenInterface) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(token));
    navigate("/logged");
  };

  const contextValue = {
    token: token,
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
