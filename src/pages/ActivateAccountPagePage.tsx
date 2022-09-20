import { useParams } from "react-router-dom";
import classes from "../assets/FormCard.module.css";
import { fetchDataPost, showMessage } from "../shared";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ActivateAccountPagePage = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  console.log(uid, token);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const path = "/accounts/users/activation/";
    const body = {
      uid: uid,
      token: token,
    };

    fetchDataPost(path, body)
      .then((data) => {
        console.log(data);
        /*         navigate("/");
         */
      })
      .catch((err) => {
        console.log(err);
        /*         for (const property in err.errMessages) {
          for (const problem of err.errMessages[property]) {
            problem !== undefined
              ? showMessage(`Password is not changed: ${problem}`, "error")
              : showMessage(
                  `Password is not changed: ${err.defaultMessage}`,
                  "error"
                );
          }
        } */
      });
  };

  return (
    <>
      <section className={classes.form}>
        <h1>Activate Your account</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.actions}>
            <button type="submit">Click to activate</button>
          </div>
          <ToastContainer />
        </form>
      </section>
    </>
  );
};
