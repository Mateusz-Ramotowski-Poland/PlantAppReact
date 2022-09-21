import { formErrorState } from "../../interafces";

export function confirmValueValidation(value: string, confirmValue: string) {
  return (errorState: formErrorState) => ({
    ...errorState,
    passwordMissmatch: value !== confirmValue,
  });
}
