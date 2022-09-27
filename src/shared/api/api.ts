import { TokenInterface } from "../../interafces";
import { CONTENT_TYPE, CONTENT_TYPE_KEY, AUTH_TOKEN } from "./constants";
import { Config } from "../../interafces";

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

function processInputData<T>(path: string, { headers }: any) {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const createdHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });
  const changedHeaders = addAuthHeader(createdHeaders);
  const changedConfig = {
    headers: changedHeaders,
  };
  return { url, changedConfig };
}

export function fetchData(url: string, requestParameters: Config) {
  return fetch(url, requestParameters).then((response) => {
    if (!response.ok) throw { response: response };

    if (response.status === 204) return response.text();

    if (response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.JSON)
      return response.json();

    if (response.headers.get(CONTENT_TYPE_KEY) === CONTENT_TYPE.TEXT)
      return response.text();

    throw new Error("Unhandled response headers", { cause: response });
  });
}

function createError(data: any) {
  return data.response.json().then((data: any) => {
    let errorMessage = "Wrong form data!";
    if (data?.error?.message) {
      errorMessage = data.error.message;
    }
    return { defaultMessage: errorMessage, errMessages: data };
  });
}

function isTokenInterface(data: any): data is TokenInterface {
  return (data as TokenInterface).access !== undefined;
}

function refreshToken() {
  const token: string | null = localStorage.getItem("token");
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
    return fetchData(url, {
      headers: headers,
      body: body,
      method: "POSt",
    }).then(async (data: unknown) => {
      if (!isTokenInterface(data)) {
        throw await createError(data);
      }

      localStorage.setItem("token", JSON.stringify(data));
    });
  }
  throw new Error("Token does not exist");
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

function post<Response>(path: string, config: Config): Promise<Response> {
  const { url, changedConfig } = processInputData(path, config);
  (changedConfig as Config).body = JSON.stringify(config.body);
  (changedConfig as Config).method = config.method;

  return fetchData(url, changedConfig as Config).catch(async (err) => {
    if (!is401HTTPResponse(err)) {
      throw await createError(err);
    }
    return refreshToken()
      .then(() => {
        return fetchData(url, changedConfig as Config).catch(async (err) => {
          throw await createError(err);
        });
      })
      .catch(async () => {
        throw await createError(err);
      });
  });
}

function get<Response>(path: string, config: any): Promise<Response> {
  if (config.params) {
    path = path + "?" + new URLSearchParams([["author", config.id]]).toString();
  }

  const { url, changedConfig } = processInputData(path, config);

  return fetchData(url, changedConfig as Config).catch(async (data) => {
    throw await createError(data);
  });
}

export const api = {
  post: post,
  get: get,
  delete() {},
  put: {},
  patch: {},
};
