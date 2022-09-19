import { isContainOnlyNumbers } from "./containOnlyNumbers";

export function confirmOnlyNumbersValidation<ErrorsState>(value: string) {
  return (errorState: ErrorsState) => ({
    ...errorState,
    onlyDigits: isContainOnlyNumbers(value),
  });
}
