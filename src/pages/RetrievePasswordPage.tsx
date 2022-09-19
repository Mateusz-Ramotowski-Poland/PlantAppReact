import classes from "../components/UI/FormCard.module.css";
import { FormCard } from "../components/UI/FormCard";
import { useRef } from "react";
import { fetchDataPost, showMessage } from "../functions";

export const RetrievePasswordPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef?.current?.value;
    const path = "/accounts/users/reset_password/";
    const body = {
      email: email,
    };

    fetchDataPost(path, body)
      .then((data) => {
        console.log(data);
        /* showMessage("New account was created!", "info"); */
      })
      .catch((err) => {
        console.log(err);
        /*  for (const property in err.res) {
          for (const problem of err.res[property]) {
            problem !== undefined
              ? showMessage(`User not created: ${problem}`, "error")
              : showMessage(`User not created: ${err.errorMessage}`, "error");
          }
        } */
      });
  };

  return (
    <FormCard>
      <section className={classes.auth}>
        <h1>Do not you remember the password?</h1>
        <p>Write email to your account</p>
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
        </form>
      </section>
    </FormCard>
  );
};
