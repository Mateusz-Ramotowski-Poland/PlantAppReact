import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showMessage = (message: string, messageType: "info" | "error") => {
  toast[messageType](message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

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
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
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
