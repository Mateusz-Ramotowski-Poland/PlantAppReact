import React, { useRef, useState } from "react";
import classes from "../UI/FormCard.module.css";
import { FormCard } from "../UI/FormCard";
import { fetchDataPost } from "../../functions";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showMessage, isContainOnlyNumbers } from "../../functions";

export const CreateAccountForm = () => {
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [onlyDigitsError, setOnlyDigitsError] = useState("");
  const formError =
    onlyDigitsError === "" && passwordMatchError === "" ? false : true;

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const passwordChangeHandler = () => {
    const password = passwordInputRef?.current?.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value;
    password !== confirmPassword
      ? setPasswordMatchError("Password and confirm password don't match")
      : setPasswordMatchError("");

    isContainOnlyNumbers(passwordInputRef?.current?.value as string)
      ? setOnlyDigitsError("Password can't contain only numbers")
      : setOnlyDigitsError("");
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef?.current?.value;
    const username = usernameInputRef?.current?.value;
    const email = emailInputRef?.current?.value;
    const path = "/accounts/users/";
    const body = {
      username: username,
      password: password,
      email: email,
    };
    if (!formError) {
      fetchDataPost(path, body)
        .then(() => {
          showMessage("New account was created!", "info");
        })
        .catch((err) => {
          for (const property in err.res) {
            for (const problem of err.res[property]) {
              problem !== undefined
                ? showMessage(`User not created: ${problem}`, "error")
                : showMessage(`User not created: ${err.errorMessage}`, "error");
            }
          }
        });
    }
  };

  return (
    <FormCard>
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
                minLength={8}
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
          {passwordMatchError !== "" && (
            <p className={classes.alert}>{passwordMatchError}</p>
          )}
          {onlyDigitsError !== "" && (
            <p className={classes.alert}>{onlyDigitsError}</p>
          )}
          <div className={classes.actions}>
            <button type="submit">Create account</button>
          </div>
          <Link to="/" className={classes.pointner}>
            Login to Your account
          </Link>
          <ToastContainer />
        </form>
      </section>
    </FormCard>
  );
};
