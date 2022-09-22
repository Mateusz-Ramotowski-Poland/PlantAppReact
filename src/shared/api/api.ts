import { TokenInterface } from "../../interafces";

interface RequestConfig {
  "Content-Type"?: string;
  Authorization?: string;
}

function addAuth(headers: RequestConfig) {
  if (Object.hasOwn(headers, "Authorization")) {
    const token: TokenInterface = JSON.parse(
      localStorage.getItem("token") as string
    );
    headers.Authorization = `JWT ${token.access}`;
  }
  return headers;
}

function processInputData<T>(
  path: string,
  body: T | string,
  headers: RequestConfig
) {
  const changedBody = JSON.stringify(body);
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const headers = new Headers(changedConfig as Record<string, string>);
  const changedConfig = createHeaders(headers);

  return { changedBody, url, changedConfig };
}

function post<T>(
  path: string,
  body: T,
  config: RequestConfig = {
    "Content-Type": "application/json",
  }
): Promise<any> {
  const { changedBody, url, changedConfig } = processInputData(
    path,
    body,
    config
  );

  const headers = new Headers(changedConfig as Record<string, string>);

  return fetch(url, {
    method: "POST",
    body: changedBody,
    headers: headers,
  }).then((res) => {
    if (res.status === 204) return res.text();

    const data = res.json();

    if (res.ok) {
      return data;
    } else {
      return data.then((data) => {
        let errorMessage = "Wrong form data!";
        if (data?.error?.message) {
          errorMessage = data.error.message;
        }

        throw { defaultMessage: errorMessage, errMessages: data };
      });
    }
  });
}

export const api = {
  post: post,
  get() {}, //TODO change code of function below
  delete() {}, //TODO change code of function below
};
