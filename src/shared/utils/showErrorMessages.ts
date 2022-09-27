import { isApiError } from "../validators/isApiError";
import { showMessage } from "./toster";

export function showErrorMessages(err: unknown) {
  if (isApiError(err)) {
    for (const property in err.errMessages) {
      for (const problem of err.errMessages[property]) {
        problem !== undefined
          ? showMessage(`User not created: ${problem}`, "error")
          : showMessage(`User not created: ${err.defaultMessage}`, "error");
      }
    }
  } else {
    showMessage(`Unknown error`, "error");
    throw err;
  }
}
