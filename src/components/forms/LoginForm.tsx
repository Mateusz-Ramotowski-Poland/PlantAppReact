import React, { useRef, useState } from "react";

import classes from "./loginForm.module.css";
import { tokenInterface } from "../../interafces";
import { fetchDataPost } from "../../functions";
import { useLogin } from "../../hooks/useLogin";

import { WrongLoginCredentials } from "./WrongLoginCredentials";
import { WrongCreateCredentials } from "./WrongCreateCredentials";

export const LoginForm = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const [isCreateError, setIsCreateError] = useState(false);
  const [isCreateAccountForm, setIsCreateAccountForm] = useState(false);
  const login = useLogin();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const toggleShowCreateFormHandler = () => {
    setIsCreateAccountForm((prev) => !prev);
    setIsCreateError(false);
    setIsLoginError(false);
  };

  const passwordChangeHandler = () => {
    const enteredPassword = passwordInputRef?.current?.value;
    const enteredConfirmPassword = confirmPasswordInputRef?.current?.value;
    enteredPassword === enteredConfirmPassword
      ? setIsCreateError(false)
      : setIsCreateError(true);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredPassword = passwordInputRef?.current?.value;
    const enteredConfirmPassword = confirmPasswordInputRef?.current?.value;
    const enteredUsername = usernameInputRef?.current?.value;
    const enteredEmail = emailInputRef?.current?.value;

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
      if (enteredPassword === enteredConfirmPassword) {
        console.log("request for create new account");
      }
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
              onChange={passwordChangeHandler}
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
                onChange={passwordChangeHandler}
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
        {isLoginError && !isCreateAccountForm && <WrongLoginCredentials />}
        {isCreateError && isCreateAccountForm && <WrongCreateCredentials />}
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
