import { TokenInterface } from "../../interafces";
import { tryRefreshToken } from "./tryRefreshToken";

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

function fetchData(url: string, changedHeaders: Headers, changedBody?: string) {
  const requestParameters: RequestParameters = {
    headers: changedHeaders,
    method: "GET",
  };

  if (changedBody) {
    requestParameters.method = "POST";
    requestParameters.body = changedBody;
  }

  return fetch(url, requestParameters);
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

function tryRefreshTokenAndRerunFunc(
  func: any,
  path: string,
  body: any,
  config?: RequestConfig
) {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    const tokenObj: TokenInterface = JSON.parse(token);
    return tryRefreshToken(tokenObj)
      .then(() => {
        console.log("rerun func");
        return func(path, body, config);
      })
      .catch(() => {
        //logout();
        console.log("logout function should be called here");
        throw { message: "Page can't display plants" };
      });
  }
  throw { message: "Page can't display plants" };
}

function post<Response, Body = any>(
  path: string,
  body: any,
  config?: RequestConfig
): Promise<Response> {
  const { changedBody, url, changedHeaders } = processInputData(
    path,
    config,
    body
  );

  return fetchData(url, changedHeaders, changedBody).then((res) => {
    if (res.status === 204) return res.text();
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      if (res.status === 401) {
        console.log("401 HTTP, tryRefreshTokenAndRerunFunc will be called");
        tryRefreshTokenAndRerunFunc(api.post, path, body).catch((err) =>
          console.log(err)
        );
      }

      return createAndThrowError(data);
    }
  });
}

function get<Response, Body = any>(
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
};
