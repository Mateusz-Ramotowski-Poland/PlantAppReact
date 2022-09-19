import { onlyChildrenProps } from "../../types";
import classes from "./FormCard.module.css";

export const FormCard = (props: onlyChildrenProps) => {
  return <div>{props.children}</div>;
};
