import { ApiError, TokenInterface } from "../../interafces";

export function isApiError(err: any): err is ApiError {
  return (err as ApiError).errMessages !== undefined;
}

export function isTokenInterface(data: any): data is TokenInterface {
  return (data as TokenInterface).access !== undefined;
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
