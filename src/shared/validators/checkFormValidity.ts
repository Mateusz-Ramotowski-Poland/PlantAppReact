import { FormErrorState } from "../../interfaces";

export const checkFormValidity = (formError: FormErrorState) => {
  return Object.values(formError).every((val) => !val);
};
