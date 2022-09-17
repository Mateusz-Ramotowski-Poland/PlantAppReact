import React, { useRef, useState } from "react";

import classes from "./loginForm.module.css";
import { tokenInterface } from "../../interafces";
import { fetchDataPost } from "../../functions";
import { useLogin } from "../../hooks/useLogin";

import { WrongLoginCredentials } from "./WrongLoginCredentials";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const login = useLogin();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef?.current?.value;
    const username = usernameInputRef?.current?.value;
    const path = "/accounts/jwt/create";
    const body = { username: username, password: password };

    setIsLoginError(false);
    fetchDataPost(path, body)
      .then((data: tokenInterface) => {
        login(data);
      })
      .catch((err) => {
        setIsLoginError(true);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>
            Your Username
            <input
              data-testid="username"
              type="text"
              required
              ref={usernameInputRef}
            />
          </label>
        </div>
        <div className={classes.control}>
          <label>
            Your Password
            <input
              data-testid="password"
              type="password"
              required
              ref={passwordInputRef}
            />
          </label>
        </div>

        {isLoginError && <WrongLoginCredentials />}

        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
        <Link className={classes.pointner} to="/createAccount">
          Create account
        </Link>
      </form>
    </section>
  );
};
