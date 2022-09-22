import { FormErrorState } from "../../interafces";

export const checkFormValidity = (formError: FormErrorState) => {
  return Object.values(formError).every((val) => !val);
};
