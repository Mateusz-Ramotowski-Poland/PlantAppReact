import { useParams } from "react-router-dom";
import classes from "../assets/FormCard.module.css";
import { api, showMessage } from "../shared";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Config } from "../interafces";

export const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const path = "/accounts/users/activation/";
    const body = {
      uid: uid,
      token: token,
    };
    const config: Config = {
      body: body,
      method: "POST",
    };
    api
      .post(path, config)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        showMessage(err, "error");
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
