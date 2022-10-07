import { FormErrorState } from "../../interfaces";

export function confirmValueValidation(value: string, confirmValue: string) {
  return (errorState: FormErrorState) => ({
    ...errorState,
    passwordMissmatch: value !== confirmValue,
  });
}
