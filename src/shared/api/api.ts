import { tokenInterface } from "../../interafces";

interface RequestConfig {
  "Content-Type"?: string;
  Authorization?: string;
}

function createHeaders(headers: RequestConfig) {
  if (Object.hasOwn(headers, "Authorization")) {
    const token: tokenInterface = JSON.parse(
      localStorage.getItem("token") as string
    );
    headers.Authorization = `JWT ${token.access}`;
  }
  return headers;
}

function ProcessInputData<T>(
  path: string,
  body: T | string,
  headers: RequestConfig
) {
  const changedBody = JSON.stringify(body);
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
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
  const { changedBody, url, changedConfig } = ProcessInputData(
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
