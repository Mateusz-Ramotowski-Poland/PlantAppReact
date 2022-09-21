import { formErrorState } from "../../interafces";

export const checkFormValidity = (formError: formErrorState) => {
  return Object.values(formError).every((val) => !val);
};
