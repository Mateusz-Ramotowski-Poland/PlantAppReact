import { TokenInterface } from "../../interafces";

interface RequestConfig {
  Authorization?: string;
}

function addAuthHeader(
  createdHeaders: Headers,
  headers: RequestConfig | undefined
) {
  if (headers && Object.hasOwn(headers, "Authorization") !== null) {
    const token: TokenInterface = JSON.parse(
      localStorage.getItem("token") as string
    );
    createdHeaders.append("Authorization", `JWT ${token.access}`);
  }
  return createdHeaders;
}

function processInputData<T>(
  path: string,
  body: T | string,
  headers: RequestConfig | undefined
) {
  const changedBody = JSON.stringify(body);
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const createdHeaders = new Headers({ "Content-Type": "application/json" });
  const changedHeaders = addAuthHeader(createdHeaders, headers);
  return { changedBody, url, changedHeaders };
}

function post<T>(
  path: string,
  body: T,
  config?: RequestConfig | undefined
): Promise<any> {
  const { changedBody, url, changedHeaders } = processInputData(
    path,
    body,
    config
  );

  return fetch(url, {
    method: "POST",
    body: changedBody,
    headers: changedHeaders,
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
