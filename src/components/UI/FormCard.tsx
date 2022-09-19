import { onlyChildrenProps } from "../../types";
import classes from "./FormCard.module.css";

export const FormCard = (props: onlyChildrenProps) => {
  return <div className={classes.card}>{props.children}</div>;
};
