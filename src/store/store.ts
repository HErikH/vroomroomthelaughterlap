import { applyMiddleware, legacy_createStore, type Reducer } from "redux";
import { rootReducer } from "../redux/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import type { T_GarageState } from "../redux/garage/types";
import type { T_WinnersState } from "../redux/winners/types";
import type { T_RaceState } from "../redux/race/types";

export const store = legacy_createStore(
  rootReducer as Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type T_RootState = {
  garage: T_GarageState;
  winners: T_WinnersState;
  race: T_RaceState;
};
export type T_Dispatch = typeof store.dispatch;
