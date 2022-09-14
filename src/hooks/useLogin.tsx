import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export const useLogin = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.login;
};
