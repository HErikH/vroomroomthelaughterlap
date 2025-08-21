import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectWinnersCurrentPage,
  selectWinnersTotalCount,
  selectWinnersSortBy,
  selectWinnersSortOrder,
  selectWinners,
} from "../../redux/winners/selectors";
import { fetchWinners } from "../../redux/winners/thunks";
import { setSort } from "../../redux/winners/actionCreators";
import { WinnersTable } from "../../components/winnersTable/WinnersTable";
import { Pagination } from "../../components/ui/pagination/Pagination";
import "./style.scss";
import type { T_WinnerSortBy } from "../../redux/winners/types";
import { selectIsRaceRunning } from "../../redux/race/selectors";
import { resetAllRaces } from "../../redux/race/thunks";

export function WinnersPage() {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const currentPage = useAppSelector(selectWinnersCurrentPage);
  const totalWinners = useAppSelector(selectWinnersTotalCount);
  const sortBy = useAppSelector(selectWinnersSortBy);
  const sortOrder = useAppSelector(selectWinnersSortOrder);
  const isRunning = useAppSelector(selectIsRaceRunning);

  useEffect(() => {
    if (isRunning) {
      dispatch(resetAllRaces());
    }
    dispatch(fetchWinners(currentPage, 10, sortBy, sortOrder));
  }, [dispatch, sortBy, sortOrder]);

  const handleSort = (column: T_WinnerSortBy) => {
    const newOrder = column === sortBy && sortOrder === "ASC" ? "DESC" : "ASC";
    dispatch(setSort({ sortBy: column, sortOrder: newOrder }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchWinners(page, 10, sortBy, sortOrder));
  };

  return (
    <div className="winners-view">
      <div className="winners-view__header">
        <h2 className="winners-view__title">Winners ({totalWinners})</h2>
      </div>

      <WinnersTable
        winners={winners}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={totalWinners}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
