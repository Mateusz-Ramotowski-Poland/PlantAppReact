import { useContext } from "react";
import { AuthContext } from "../store/authContext";

export const useLogin = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.login;
};
