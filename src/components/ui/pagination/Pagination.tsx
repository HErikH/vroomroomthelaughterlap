import React from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (pageCount <= 1) return null;

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        className="pagination"
        activeClassName="active"
        forcePage={currentPage - 1}
      />
    </div>
  );
};
