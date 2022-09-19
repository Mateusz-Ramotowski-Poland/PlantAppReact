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
