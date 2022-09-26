import { TokenInterface } from "../../interafces";
import { CONTENT_TYPE, CONTENT_TYPE_KEY } from "./constants";

interface RequestConfig {
  Authorization?: string;
}

interface RequestParameters {
  headers: Headers;
  method: string;
  body?: string;
}

const AUTH_TOKEN = "Authorization";

function addAuthHeader(createdHeaders: Headers) {
  if (!createdHeaders.has(AUTH_TOKEN)) {
    const token: TokenInterface = JSON.parse(
      localStorage.getItem("token") as string
    );
    if (token) {
      createdHeaders.set(AUTH_TOKEN, `JWT ${token.access}`);
    }
  }

  if (createdHeaders.get(AUTH_TOKEN) === "undefined")
    createdHeaders.delete(AUTH_TOKEN);

  return createdHeaders;
}

function processInputData<T>(
  path: string,
  headers: RequestConfig | undefined,
  body: T | string | null = null
) {
  const changedBody = JSON.stringify(body);
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const createdHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });
  const changedHeaders = addAuthHeader(createdHeaders);
  return { changedBody, url, changedHeaders };
}

export function fetchData(
  url: string,
  changedHeaders: Headers,
  changedBody?: string
) {
  const requestParameters: RequestParameters = {
    headers: changedHeaders,
    method: "GET",
  };

  if (changedBody) {
    requestParameters.method = "POST";
    requestParameters.body = changedBody;
  }

  return fetch(url, requestParameters).then((response) => {
    if (!response.ok) throw { response: response };

    if (response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.JSON)
      return response.json();

    if (response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.TEXT)
      return response.text();

    throw new Error("Unhandled response headers", { cause: response });
  });
}

function createAndThrowError(data: Promise<any>) {
  return data.then((data) => {
    let errorMessage = "Wrong form data!";
    if (data?.error?.message) {
      errorMessage = data.error.message;
    }
    throw { defaultMessage: errorMessage, errMessages: data };
  });
}

function isTokenInterface(data: any): data is TokenInterface {
  return (data as TokenInterface).access !== undefined;
}

function refreshToken() {
  const token: string | null = localStorage.getItem("token");
  const errorMessage = "Error while refreshing token";
  if (token) {
    const tokenObj: TokenInterface = JSON.parse(token);
    const url = `${
      process.env.REACT_APP_DOMAIN as string
    }/accounts/jwt/refresh/`;
    const headers = new Headers({
      Authorization: tokenObj.access,
      "Content-Type": "application/json",
    });
    const body = JSON.stringify({ refresh: tokenObj.refresh });
    return fetchData(url, headers, body).then((data: unknown) => {
      if (!isTokenInterface(data)) {
        throw new Error(`${errorMessage}: ${data}`);
      }

      localStorage.setItem("token", JSON.stringify(data));
    });
  }
  throw new Error(errorMessage);
}

interface Response {
  response: any;
}

function isResponse(data: any): data is Response {
  return (data as Response).response !== undefined;
}

function is401HTTPResponse(data: any) {
  if (!isResponse) return false;

  return data.response.status === 401;
}

function post<Response, Body = any>(
  path: string,
  body: Body,
  config?: RequestConfig
): Promise<Response> {
  const { changedBody, url, changedHeaders } = processInputData(
    path,
    config,
    body
  );

  return fetchData(url, changedHeaders, changedBody).catch((err) => {
    if (!is401HTTPResponse(err))
      throw new Error(`Unhandled response headers: ${err}`);

    return refreshToken()
      .then(() => {
        return fetchData(url, changedHeaders, changedBody).catch((err) => {
          throw new Error(`Error while refreshing token: ${err}`);
        });
      })
      .catch(() => {
        throw new Error(`Error while refreshing token: ${err}`);
      });
  });
}

function get<Response, Params = any>(
  path: string,
  config?: RequestConfig
): Promise<Response> {
  const { url, changedHeaders } = processInputData(path, config);

  return fetchData(url, changedHeaders).then((res) => {
    if (res.status === 204) return res.text();
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      //TODO check if token err (check HTTP status code) and add and write ifRefreshTokenRerunFunc()
      return createAndThrowError(data);
    }
  });
}

export const api = {
  post: post,
  get: get,
  delete() {},
  put: {},
  patch: {},
};
