import { tokenInterface } from "../../interafces";

interface headerInterface {
  "Content-Type": string;
  Authorization?: string;
}

export function fetchDataPost<T>(
  path: string,
  body: T,
  config: any = {
    "Content-Type": "application/json",
  }
): Promise<any> {
  if (Object.keys(config).includes("authorization")) {
    const token: tokenInterface = JSON.parse(
      localStorage.getItem("token") as string
    );
    config.authorization = `JWT ${token.access}`;
  }

  return makeRequest(path, body, config);
}

export function makeRequest<T>(
  path: string,
  body: T,
  config: any
): Promise<any> {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const headers = new Headers(config);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
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
