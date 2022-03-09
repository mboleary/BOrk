/**
 * Contains the typed redux hooks used throughout the application
 */

import { TypedUseSelectorHook, useDispatch as useDispatchUntyped, useSelector as useSelectorUntyped } from "react-redux";
import type {RootState, AppDispatch} from "./store";

export const useDispatch = () => useDispatchUntyped<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorUntyped;