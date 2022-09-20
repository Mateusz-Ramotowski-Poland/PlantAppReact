import classes from "../assets/FormCard.module.css";
import { useRef } from "react";
import { fetchDataPost } from "../shared";

export const RetrievePasswordFormPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef?.current?.value;
    const path = "/accounts/users/reset_password/";
    const body = { email: email };

    fetchDataPost(path, body)
      .then((data) => {
        console.log(data);

        /* showMessage("New account was created!", "info"); */
      })
      .catch((err) => {
        console.dir(err);
        console.log(err);
        console.log(err.errorMessage, err.data);
        /*   for (const property in err.res) {
          for (const problem of err.res[property]) {
            problem !== undefined
              ? showMessage(`User not created: ${problem}`, "error")
              : showMessage(`User not created: ${err.errorMessage}`, "error");
          }
        } */
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
        </form>
      </section>
    </>
  );
};
