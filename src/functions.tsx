import "react-toastify/dist/ReactToastify.css";

export function isContainOnlyNumbers(str: string) {
  return /^[0-9]+$/.test(str);
}

export function fetchDataPost<T>(path: string, body: T): Promise<any> {
  const url = `${process.env.REACT_APP_DOMAIN as string}${path}`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    const data = res.json();
    if (res.ok) {
      console.log("ok");
      return data;
    } else {
      console.log("error");
      return data.then((data) => {
        let errorMessage = "Wrong form data!";
        if (data?.error?.message) {
          errorMessage = data.error.message;
        }

        throw { errorMessage: errorMessage, res: data };
      });
    }
  });
}
