import type { T_CarWithWins, T_WinnerSortBy, T_WinnerSortOrder } from "../../redux/winners/types";

type T_WinnersTableProps = {
  winners: T_CarWithWins[];
  sortBy: T_WinnerSortBy;
  sortOrder: T_WinnerSortOrder;
  onSort: (column: T_WinnerSortBy) => void;
};

export function WinnersTable({
  winners,
  sortBy,
  sortOrder,
  onSort,
}: T_WinnersTableProps) {
  const getSortIcon = (column: T_WinnerSortBy) => {
    if (sortBy !== column) return "";
    return sortOrder === "ASC" ? "↑" : "↓";
  };

  return (
    <div className="winners-table">
      <table className="table">
        <thead>
          <tr>
            <th>Car Number</th>
            <th>Car</th>
            <th>Name</th>
            <th className="sortable" onClick={() => onSort("wins")}>
              Wins {getSortIcon("wins")}
            </th>
            <th className="sortable" onClick={() => onSort("time")}>
              Best Time {getSortIcon("time")}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => (
            <tr key={winner.id}>
              <td>{winner.id}</td>
              <td>
                <span
                  className="car-icon"
                  style={{ backgroundColor: winner.color }}
                >
                  🏎️
                </span>
              </td>
              <td>{winner.name}</td>
              <td>{winner.wins || 0}</td>
              <td>{winner.bestTime ? winner.bestTime.toFixed(2) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
