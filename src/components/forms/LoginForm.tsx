import React, { useRef, useState } from "react";

import classes from "./loginForm.module.css";
import { tokenInterface } from "../../interafces";
import { fetchDataPost } from "../../functions";
import { useLogin } from "../../hooks/useLogin";

import { WrongCredentials } from "./WrongCredentials";

export const LoginForm = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const [isCreateAccountForm, setIsCreateAccountForm] = useState(false);
  const login = useLogin();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const toggleShowCreateFormHandler = () => {
    setIsCreateAccountForm((prev) => !prev);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef?.current?.value as string;
    const enteredConfirmPassword = confirmPasswordInputRef?.current
      ?.value as string;
    const enteredUsername = usernameInputRef?.current?.value as string;
    const enteredEmail = emailInputRef?.current?.value as string;

    if (!isCreateAccountForm) {
      fetchDataPost("/accounts/jwt/create", {
        username: enteredEmail,
        password: enteredPassword,
      })
        .then((data: tokenInterface) => {
          setIsLoginError(false);
          login(data);
        })
        .catch((err) => {
          setIsLoginError(true);
        });
    } else {
      console.log("Request for create account");
    }
  };

  const loginOrCreate = isCreateAccountForm ? "Create account" : "Login";

  return (
    <section className={classes.auth}>
      <h1>{loginOrCreate}</h1>
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
        {isCreateAccountForm && (
          <div className={classes.control}>
            <label>
              Confirm Password
              <input
                data-testid="confirm-password"
                type="password"
                required
                ref={confirmPasswordInputRef}
              />
            </label>
          </div>
        )}
        {isCreateAccountForm && (
          <div className={classes.control}>
            <label>
              Your email
              <input
                data-testid="email"
                type="email"
                required
                ref={emailInputRef}
              />
            </label>
          </div>
        )}
        {isLoginError && <WrongCredentials />}
        <div className={classes.actions}>
          <button type="submit">{loginOrCreate}</button>
        </div>
        {!isCreateAccountForm && (
          <p className={classes.pointner} onClick={toggleShowCreateFormHandler}>
            Create account
          </p>
        )}
        {isCreateAccountForm && (
          <p className={classes.pointner} onClick={toggleShowCreateFormHandler}>
            Login to your account
          </p>
        )}
      </form>
    </section>
  );
};
