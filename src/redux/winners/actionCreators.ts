import type {
  T_AddWinner,
  T_SetCurrentPage,
  T_SetSort,
  T_SetTotalWinners,
  T_SetWinners,
  T_UpdateWinner,
} from "./types";
import { WINNERS_ACTION_TYPES } from "./actionTypes";

export const setWinners = (winners: T_SetWinners["payload"]): T_SetWinners => ({
  type: WINNERS_ACTION_TYPES.SET_WINNERS,
  payload: winners,
});

export const addWinner = (winner: T_AddWinner["payload"]): T_AddWinner => ({
  type: WINNERS_ACTION_TYPES.ADD_WINNER,
  payload: winner,
});

export const updateWinner = (
  winner: T_UpdateWinner["payload"]
): T_UpdateWinner => ({
  type: WINNERS_ACTION_TYPES.UPDATE_WINNER,
  payload: winner,
});

export const setCurrentPage = (
  page: T_SetCurrentPage["payload"]
): T_SetCurrentPage => ({
  type: WINNERS_ACTION_TYPES.SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalWinners = (
  total: T_SetTotalWinners["payload"]
): T_SetTotalWinners => ({
  type: WINNERS_ACTION_TYPES.SET_TOTAL_WINNERS,
  payload: total,
});

export const setSort = (sort: T_SetSort["payload"]): T_SetSort => ({
  type: WINNERS_ACTION_TYPES.SET_SORT,
  payload: sort,
});
