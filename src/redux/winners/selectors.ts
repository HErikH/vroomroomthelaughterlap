import type { T_RootState } from '../../store/store';

export const selectWinners = (state: T_RootState) => state.winners.winners;
export const selectWinnersCurrentPage = (state: T_RootState) => state.winners.currentPage;
export const selectWinnersTotalCount = (state: T_RootState) => state.winners.totalWinners;
export const selectWinnersSortBy = (state: T_RootState) => state.winners.sortBy;
export const selectWinnersSortOrder = (state: T_RootState) => state.winners.sortOrder;

export const selectPaginatedWinners = (state: T_RootState) => {
  const winners = selectWinners(state);
  const currentPage = selectWinnersCurrentPage(state);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return winners.slice(startIndex, startIndex + itemsPerPage);
};