import type { T_Car } from "../garage/types";
import type { WINNERS_ACTION_TYPES } from "./actionTypes";

export type T_Winner = {
  id: number;
  wins: number;
  time: number;
};

export type T_CarWithWins = {
  wins?: number;
  bestTime?: number;
} & T_Car;

export type T_WinnerSortBy = "wins" | "time";

export type T_WinnerSortOrder = "ASC" | "DESC";

export type T_WinnersState = {
  winners: T_CarWithWins[];
  currentPage: number;
  totalWinners: number;
  sortBy: T_WinnerSortBy;
  sortOrder: T_WinnerSortOrder;
};

export type T_SetWinners = {
  type: typeof WINNERS_ACTION_TYPES.SET_WINNERS;
  payload: T_CarWithWins[];
};

export type T_AddWinner = {
  type: typeof WINNERS_ACTION_TYPES.ADD_WINNER;
  payload: T_CarWithWins;
};

export type T_UpdateWinner = {
  type: typeof WINNERS_ACTION_TYPES.UPDATE_WINNER;
  payload: T_CarWithWins;
};

export type T_SetCurrentPage = {
  type: typeof WINNERS_ACTION_TYPES.SET_CURRENT_PAGE;
  payload: number;
};

export type T_SetTotalWinners = {
  type: typeof WINNERS_ACTION_TYPES.SET_TOTAL_WINNERS;
  payload: number;
};

export type T_SetSort = {
  type: typeof WINNERS_ACTION_TYPES.SET_SORT;
  payload: {
    sortBy: T_WinnerSortBy;
    sortOrder: T_WinnerSortOrder;
  };
};

// Union of all winner actions
export type T_WinnersActions =
  | T_SetWinners
  | T_AddWinner
  | T_UpdateWinner
  | T_SetCurrentPage
  | T_SetTotalWinners
  | T_SetSort;
