import { TokenInterface } from "../../interafces";

interface RequestConfig {
  Authorization?: string;
}

const AUTH_TOKEN = "Authorization";

function addAuthHeader(
  createdHeaders: Headers,
  headers: RequestConfig | undefined
) {
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
  body: T | string,
  headers: RequestConfig | undefined
) {
  const changedBody = JSON.stringify(body);
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const createdHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });
  const changedHeaders = addAuthHeader(createdHeaders, headers);
  return { changedBody, url, changedHeaders };
}

function fetchData(url: string, changedBody: string, changedHeaders: Headers) {
  return fetch(url, {
    method: "POST",
    body: changedBody,
    headers: changedHeaders,
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

function post<Response, Body = any>(
  path: string,
  body: Body,
  config?: RequestConfig
): Promise<Response> {
  const { changedBody, url, changedHeaders } = processInputData(
    path,
    body,
    config
  );

  return fetchData(url, changedBody, changedHeaders).then((res) => {
    if (res.status === 204) return res.text();
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      return createAndThrowError(data);
    }
  });
}

export const api = {
  post: post,
  get() {}, //TODO change code of function below
  delete() {}, //TODO change code of function below
};
