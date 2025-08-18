import { RACE_ACTION_TYPES } from "./actionTypes";
import type {
  T_CarFinished,
  T_FinishRace,
  T_ResetRace,
  T_SetWinner,
  T_StartRace,
} from "./types";

export const startRace = (): T_StartRace => ({
  type: RACE_ACTION_TYPES.START_RACE,
});

export const finishRace = (): T_FinishRace => ({
  type: RACE_ACTION_TYPES.FINISH_RACE,
});

export const resetRace = (): T_ResetRace => ({
  type: RACE_ACTION_TYPES.RESET_RACE,
});

export const setWinner = (winner: T_SetWinner["payload"]): T_SetWinner => ({
  type: RACE_ACTION_TYPES.SET_WINNER,
  payload: winner,
});

export const carFinished = (
  carId: T_CarFinished["payload"]
): T_CarFinished => ({
  type: RACE_ACTION_TYPES.CAR_FINISHED,
  payload: carId,
});
