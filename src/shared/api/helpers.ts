import { TokenInterface } from "../../interafces";
import { AUTH_TOKEN, CONTENT_TYPE, CONTENT_TYPE_KEY } from "./constants";
import { is401HTTPResponse, isTokenInterface } from "./guards";
import { FetchConfig, RequestConfig } from "./interfaces";

export function addAuthHeader(createdHeaders: Headers) {
  if (!createdHeaders.has(AUTH_TOKEN)) {
    const token: TokenInterface = JSON.parse(localStorage.getItem("token") as string);
    if (token) {
      createdHeaders.set(AUTH_TOKEN, `JWT ${token.access}`);
    }
  }
  if (createdHeaders.get(AUTH_TOKEN) === "undefined") createdHeaders.delete(AUTH_TOKEN);
  return createdHeaders;
}

export function processInputData<T>(path: string, config: RequestConfig | undefined) {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  let createdHeaders;
  if (config?.headers) {
    createdHeaders = new Headers({
      "Content-Type": "application/json",
      ...config.headers,
    });
  } else {
    createdHeaders = new Headers({
      "Content-Type": "application/json",
    });
  }
  const changedHeaders = addAuthHeader(createdHeaders);
  return { url, changedHeaders };
}

export function fetchData(url: string, requestParameters: FetchConfig) {
  return fetch(url, requestParameters).then((response) => {
    if (!response.ok) throw new Error("Response not ok", { cause: response });

    if (response.status === 204 || response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.TEXT) {
      return response.text();
    }

    if (response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.JSON) return response.json();

    throw new Error("Unhandled response headers", { cause: response });
  });
}

export function createError(data: any) {
  return data.response.json().then((data: any) => {
    let errorMessage = "Wrong form data!";
    if (data?.error?.message) {
      errorMessage = data.error.message;
    }
    return { defaultMessage: errorMessage, errMessages: data };
  });
}

export function refreshToken() {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    const tokenObj: TokenInterface = JSON.parse(token);
    const url = `${process.env.REACT_APP_DOMAIN as string}/accounts/jwt/refresh/`;
    const headers = new Headers({
      Authorization: tokenObj.access,
      "Content-Type": "application/json",
    });
    const body = JSON.stringify({ refresh: tokenObj.refresh });
    return fetchData(url, {
      headers: headers,
      body: body,
      method: "POST",
    }).then(async (data: unknown) => {
      if (!isTokenInterface(data)) {
        throw await createError(data);
      }

      localStorage.setItem("token", JSON.stringify(data));
    });
  }
  throw new Error("Token does not exist");
}

export async function sendRequestAgain(err: unknown, requestParameters: FetchConfig, url: string) {
  if (is401HTTPResponse(err)) {
    return refreshToken()
      .then(() => {
        return fetchData(url, requestParameters).catch(async (err) => {
          throw await createError(err);
        });
      })
      .catch(async () => {
        throw await createError(err);
      });
  }
  throw await createError(err);
}

export function post<Response>(path: string, body: object, config?: RequestConfig): Promise<Response> {
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "POST",
    body: JSON.stringify(body),
    headers: changedHeaders,
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}

export function get<Response>(path: string, config?: RequestConfig): Promise<Response> {
  if (config?.params) {
    path = path + "?" + new URLSearchParams(Object.entries(config.params)).toString();
  }
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "GET",
    headers: changedHeaders,
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}
