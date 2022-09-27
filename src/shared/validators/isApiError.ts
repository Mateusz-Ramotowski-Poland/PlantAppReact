import { ApiError } from "../../interafces";

export function isApiError(err: any): err is ApiError {
  return (err as ApiError).errMessages !== undefined;
}
