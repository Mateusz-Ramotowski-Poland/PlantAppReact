import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";
import { fetchDataPost } from "../../functions";
import { WrongCreateCredentials } from "./WrongCreateCredentials";
import { Link } from "react-router-dom";

export const CreateAccountForm = () => {
  const [isCreateError, setIsCreateError] = useState(false);
  const [isShowNewAccountMessage, setisShowNewAccountMessage] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const passwordChangeHandler = () => {
    const password = passwordInputRef?.current?.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value;
    setIsCreateError(password !== confirmPassword);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef?.current?.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value;
    const username = usernameInputRef?.current?.value;
    const email = emailInputRef?.current?.value;

    const path = "/accounts/users/";
    const body = {
      username: username,
      password: password,
      email: email,
    };

    if (password === confirmPassword) {
      fetchDataPost(path, body)
        .then(() => {
          setisShowNewAccountMessage(true);
          const timerId = setTimeout(() => {
            setisShowNewAccountMessage(false);
            clearTimeout(timerId);
          }, 5000);
        })
        .catch((err) => {
          setisShowNewAccountMessage(false);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Create account</h1>
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
        {isCreateError && <WrongCreateCredentials />}
        <div className={classes.actions}>
          <button type="submit">Create account</button>
        </div>
        <Link to="/" className={classes.pointner}>
          Login to Your account
        </Link>
        {isShowNewAccountMessage && (
          <p className={classes.newUser}>New account was created!</p>
        )}
      </form>
    </section>
  );
};
