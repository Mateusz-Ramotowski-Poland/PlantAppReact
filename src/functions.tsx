import "react-toastify/dist/ReactToastify.css";

export function isContainOnlyNumbers(str: string) {
  return /^[0-9]+$/.test(str);
}
