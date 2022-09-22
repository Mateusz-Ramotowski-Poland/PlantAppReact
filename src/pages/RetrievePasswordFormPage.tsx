import classes from "../assets/FormCard.module.css";
import { useRef } from "react";
import { api, showMessage } from "../shared";
import { ToastContainer } from "react-toastify";

export const RetrievePasswordFormPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef?.current?.value;
    const path = "/accounts/users/reset_password/";
    const body = { email: email };

    api
      .post(path, body)
      .then(() => {
        showMessage("Check your email", "info");
      })
      .catch((err) => {
        showMessage(err, "error");
      });
  };

  return (
    <>
      <section className={classes.form}>
        <h1>Do not you remember the password?</h1>
        <form onSubmit={submitHandler}>
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
          <div className={classes.actions}>
            <button type="submit">Go further</button>
          </div>
          <ToastContainer />
        </form>
      </section>
    </>
  );
};
