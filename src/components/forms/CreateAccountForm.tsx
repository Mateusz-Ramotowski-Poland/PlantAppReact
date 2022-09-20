import React, { useRef, useState } from "react";
import classes from "../../assets/FormCard.module.css";
import {
  fetchDataPost,
  showMessage,
  confirmValueValidation,
  confirmOnlyNumbersValidation,
  checkFormValidity,
} from "../../shared";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FormErrorState } from "../../interafces";

export const CreateAccountForm = () => {
  const [formError, setFormError] = useState<FormErrorState>({});
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const passwordChangeHandler = () => {
    const password = passwordInputRef?.current?.value as string;
    const confirmPassword = confirmPasswordInputRef?.current?.value as string;

    setFormError(confirmValueValidation(password, confirmPassword));
    setFormError(confirmOnlyNumbersValidation(password));
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

    if (checkFormValidity(formError)) {
      fetchDataPost(path, body)
        .then(() => {
          showMessage("New account was created!", "info");
        })
        .catch((err) => {
          console.dir(err);
          for (const property in err.errMessages) {
            for (const problem of err.errMessages[property]) {
              problem !== undefined
                ? showMessage(`User not created: ${problem}`, "error")
                : showMessage(
                    `User not created: ${err.defaultMessage}`,
                    "error"
                  );
            }
          }
        });
    }
  };

  return (
    <section className={classes.form}>
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
        {formError.passwordMissmatch && (
          <p className={classes.alert}>
            Passwod and confirm passsword mismatch
          </p>
        )}
        {formError.onlyDigits && (
          <p className={classes.alert}>Passwod can't contain only digits</p>
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