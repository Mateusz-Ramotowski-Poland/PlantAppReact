import { useDispatch } from "react-redux";
import { AppDispatch } from "./rootStore";

export const useAppDispatch: () => AppDispatch = useDispatch;
