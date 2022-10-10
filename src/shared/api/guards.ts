import { ApiError, AuthToken } from "../../interfaces";

export function isApiError(err: any): err is ApiError {
  return (err as ApiError).errMessages !== undefined;
}

export function isAuthToken(data: any): data is AuthToken {
  return (data as AuthToken).access !== undefined;
}

export function isError(error: any): error is Error {
  return (error as Error).message !== undefined;
}

export function isApiResponse(data: any): data is Response {
  return (data as Response).status !== undefined;
}

export function is401HTTPResponse(data: any) {
  if (isError(data) && isApiResponse(data.cause)) {
    return data.cause?.status === 401;
  }
}
