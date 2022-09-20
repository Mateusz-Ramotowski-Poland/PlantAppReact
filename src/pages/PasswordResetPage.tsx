import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import classes from "../assets/FormCard.module.css";
import {
  confirmOnlyNumbersValidation,
  confirmValueValidation,
  fetchDataPost,
  showMessage,
  checkFormValidity,
} from "../shared";
import { FormErrorState } from "../interafces";
import { ToastContainer } from "react-toastify";

export const PasswordResetPage = () => {
  const [formError, setFormError] = useState<FormErrorState>({});
  const { uid, token } = useParams();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const passwordChangeHandler = () => {
    const password = passwordInputRef?.current?.value as string;
    const confirmPassword = confirmPasswordInputRef?.current?.value as string;

    setFormError(confirmValueValidation(password, confirmPassword));
    setFormError(confirmOnlyNumbersValidation(password));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef?.current?.value;

    const path = "/accounts/users/reset_password_confirm/";
    const body = {
      uid: uid,
      token: token,
      new_password: password,
    };

    if (checkFormValidity(formError))
      fetchDataPost(path, body)
        .then(() => {
          //I will always get error doing this request
        })
        .catch((err) => {
          if (err.message === "Unexpected end of JSON input") {
            showMessage(`Password was changed`, "info");
          }

          for (const property in err.res) {
            for (const problem of err.res[property]) {
              problem !== undefined
                ? showMessage(`Password is not changed: ${problem}`, "error")
                : showMessage(
                    `Password is not changed: ${err.errorMessage}`,
                    "error"
                  );
            }
          }
        });
  };

  return (
    <>
      <section className={classes.form}>
        <h1>Write new password</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>
              Password
              <input
                data-testid="password"
                type="password"
                required
                minLength={8}
                onChange={passwordChangeHandler}
                ref={passwordInputRef}
              />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Confirm Password
              <input
                data-testid="confirm-password"
                type="password"
                onChange={passwordChangeHandler}
                ref={confirmPasswordInputRef}
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
            <button type="submit">Change password</button>
          </div>
          <ToastContainer />
        </form>
      </section>
    </>
  );
};
