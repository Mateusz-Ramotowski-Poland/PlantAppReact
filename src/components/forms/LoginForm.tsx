import React, { useRef, useState } from "react";

import classes from "./loginForm.module.css";
import { tokenInterface } from "../../interafces";
import { fetchDataPost } from "../../functions";
import { useLogin } from "../../hooks/useLogin";

import { WrongCredentials } from "./WrongCredentials";

export const LoginForm = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const login = useLogin();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value as string;
    const enteredPassword = passwordInputRef?.current?.value as string;

    fetchDataPost("/accounts/jwt/create", {
      username: enteredEmail,
      password: enteredPassword,
    })
      .then((data: tokenInterface) => {
        console.log(data);
        setIsLoginError(false);
        console.log("hellothere!", login);
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
              ref={emailInputRef}
            />
          </label>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            data-testid="password"
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {isLoginError && <WrongCredentials />}
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};
