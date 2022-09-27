import { ApiError } from "../../interafces";

export function isApiError(err: any): err is ApiError {
  console.log(err);
  console.log(err.errMessages);
  return (err as ApiError).errMessages !== undefined;
}
