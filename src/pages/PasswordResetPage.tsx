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
        .then((data) => {
          showMessage(data, "info");
        })
        .catch((err) => {
          showMessage(err, "error");
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
          <div className={classes.actions}>
            <button type="submit">Change password</button>
          </div>
        </form>
      </section>
    </>
  );
};
