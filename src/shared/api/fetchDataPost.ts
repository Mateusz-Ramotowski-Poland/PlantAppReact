import { tokenInterface } from "../../interafces";

export function fetchDataPost<T>(
  path: string,
  body: T,
  isTokenInHeaders: boolean = false
): Promise<any> {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  let token: tokenInterface;

  if (isTokenInHeaders) {
    token = JSON.parse(localStorage.getItem("token") as string);
    headers.append("Authorization", `JWT ${token.access}`);
  }

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
