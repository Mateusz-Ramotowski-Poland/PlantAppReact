import { credentialsInterface } from "./interafces";

export function fetchData(
  path: string,
  body: credentialsInterface
): Promise<any> {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  console.log(url);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      return data.then((data) => {
        let errorMessage = "Authentication failed!";
        if (data?.error?.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      });
    }
  });
}
