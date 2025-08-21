import type { T_RootState } from '../../store/store';

export const selectWinners = (state: T_RootState) => state.winners.winners;
export const selectWinnersCurrentPage = (state: T_RootState) => state.winners.currentPage;
export const selectWinnersTotalCount = (state: T_RootState) => state.winners.totalWinners;
export const selectWinnersSortBy = (state: T_RootState) => state.winners.sortBy;
export const selectWinnersSortOrder = (state: T_RootState) => state.winners.sortOrder;