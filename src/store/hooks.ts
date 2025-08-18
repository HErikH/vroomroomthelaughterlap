import { useDispatch, useSelector } from "react-redux";
import type { T_Dispatch, T_RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<T_Dispatch>();
export const useAppSelector = useSelector.withTypes<T_RootState>()