import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
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
