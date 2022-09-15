import classes from "./WrongCreateCredentials.module.css";

export const WrongCreateCredentials = () => {
  return (
    <div className={classes.alert}>
      Password and confirm password don't match
    </div>
  );
};
