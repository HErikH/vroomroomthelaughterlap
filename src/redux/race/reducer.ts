import type { T_RaceActions, T_RaceState } from "./types";
import { RACE_ACTION_TYPES } from "./actionTypes";

const initialState: T_RaceState = {
  isRunning: false,
  winner: null,
  finishedCars: [],
};

export const raceReducer = (
  state = initialState,
  action: T_RaceActions
): T_RaceState => {
  switch (action.type) {
    case RACE_ACTION_TYPES.START_RACE:
      return {
        ...state,
        isRunning: true,
        winner: null,
        // finishedCars: [],
      };

    case RACE_ACTION_TYPES.FINISH_RACE:
      return {
        ...state,
        isRunning: false,
      };

    case RACE_ACTION_TYPES.RESET_RACE:
      return {
        ...state,
        isRunning: false,
        winner: null,
        finishedCars: [],
      };

    case RACE_ACTION_TYPES.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };

    case RACE_ACTION_TYPES.CAR_FINISHED:
      return {
        ...state,
        finishedCars: [...state.finishedCars, action.payload],
      };

    default:
      return state;
  }
};
