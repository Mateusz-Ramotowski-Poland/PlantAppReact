import { isApiError } from "../api/guards";
import { showMessage } from "./toster";

export function showErrorMessages(err: unknown) {
  if (isApiError(err)) {
    for (const property in err.errMessages) {
      for (const problem of err.errMessages[property]) {
        problem !== undefined
          ? showMessage(`Error: ${problem}`, "error")
          : showMessage(`Error: ${err.defaultMessage}`, "error");
      }
    }
  } else {
    showMessage(`Unknown error`, "error");
    throw err;
  }
}
