import React, { useState, useRef, useContext } from "react";

import classes from "./loginForm.module.css";
import { AuthContext } from "../../store/auth-context";
import { tokenInterface } from "../../interafces";
import { fetchDataPost } from "../../functions";

export const LoginForm = () => {
  const authCtx = useContext(AuthContext);

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
        authCtx.login(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Username</label>
          <input type="text" id="name" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};
