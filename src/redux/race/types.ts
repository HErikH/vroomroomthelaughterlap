import type { T_Car } from "../garage/types";
import type { RACE_ACTION_TYPES } from "./actionTypes";

export type T_RaceState = {
  isRunning: boolean;
  winner: T_Car | null;
  finishedCars: number[];
};

export type T_StartRace = {
  type: typeof RACE_ACTION_TYPES.START_RACE;
};

export type T_FinishRace = {
  type: typeof RACE_ACTION_TYPES.FINISH_RACE;
};

export type T_ResetRace = {
  type: typeof RACE_ACTION_TYPES.RESET_RACE;
};

export type T_SetWinner = {
  type: typeof RACE_ACTION_TYPES.SET_WINNER;
  payload: T_Car | null;
};

export type T_CarFinished = {
  type: typeof RACE_ACTION_TYPES.CAR_FINISHED;
  payload: number;
};

// Union of all race actions
export type T_RaceActions =
  | T_StartRace
  | T_FinishRace
  | T_ResetRace
  | T_SetWinner
  | T_CarFinished;
