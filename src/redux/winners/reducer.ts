// src/store/reducers/winnersReducer.ts
import type { T_WinnersActions, T_WinnersState } from "./types";
import { WINNERS_ACTION_TYPES } from "./actionTypes";

const initialState: T_WinnersState = {
  winners: [],
  currentPage: 1,
  totalWinners: 0,
  sortBy: "wins",
  sortOrder: "DESC",
};

export const winnersReducer = (
  state = initialState,
  action: T_WinnersActions
): T_WinnersState => {
  switch (action.type) {
    case WINNERS_ACTION_TYPES.SET_WINNERS:
      return {
        ...state,
        winners: action.payload,
      };

    case WINNERS_ACTION_TYPES.ADD_WINNER:
      return {
        ...state,
        winners: [...state.winners, action.payload],
        totalWinners: state.totalWinners + 1,
      };

    case WINNERS_ACTION_TYPES.UPDATE_WINNER:
      return {
        ...state,
        winners: state.winners.map((winner) =>
          winner.id === action.payload.id
            ? { ...winner, ...action.payload }
            : winner
        ),
      };

    case WINNERS_ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case WINNERS_ACTION_TYPES.SET_TOTAL_WINNERS:
      return {
        ...state,
        totalWinners: action.payload,
      };

    case WINNERS_ACTION_TYPES.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    default:
      return state;
  }
};
