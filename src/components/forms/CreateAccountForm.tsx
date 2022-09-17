import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";
import { fetchDataPost } from "../../functions";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showMessage, isContainOnlyNumbers } from "../../functions";

export const CreateAccountForm = () => {
  const [formError, setFormError] = useState({
    passwordMatch: "",
    onlyDigits: "",
  });
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const passwordChangeHandler = () => {
    const password = passwordInputRef?.current?.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value;
    password !== confirmPassword
      ? setFormError((prev) => {
          return {
            passwordMatch: "Password and confirm password don't match",
            onlyDigits: prev.onlyDigits,
          };
        })
      : setFormError((prev) => {
          return {
            passwordMatch: "",
            onlyDigits: prev.onlyDigits,
          };
        });
  };

  const blurHandler = () => {
    if (isContainOnlyNumbers(passwordInputRef?.current?.value as string)) {
      setFormError((prev) => {
        return {
          passwordMatch: prev.passwordMatch,
          onlyDigits: "Password can't contain only numbers",
        };
      });
    } else {
      setFormError((prev) => {
        return {
          passwordMatch: prev.passwordMatch,
          onlyDigits: "",
        };
      });
    }
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
    if (formError.passwordMatch === "" && formError.onlyDigits === "") {
      fetchDataPost(path, body)
        .then(() => {
          showMessage("New account was created!", "info");
        })
        .catch((err) => {
          for (const property in err.res) {
            for (const problem of err.res[property]) {
              if (problem !== undefined) {
                showMessage(`User not created: ${problem}`, "error");
              } else {
                showMessage(`User not created: ${err.errorMessage}`, "error");
              }
            }
          }
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
              onBlur={blurHandler}
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
        {formError.onlyDigits !== "" && (
          <p className={classes.alert}>{formError.onlyDigits}</p>
        )}
        {formError.passwordMatch !== "" && (
          <p className={classes.alert}>{formError.passwordMatch}</p>
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
  );
};
