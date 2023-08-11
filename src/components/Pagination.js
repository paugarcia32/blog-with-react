import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={handlePrevPage} className="paginationButton">
          PREVIOUS PAGE
        </button>
      )}
      {currentPage < totalPages && (
        <button onClick={handleNextPage} className="paginationButton">
          NEXT PAGE
        </button>
      )}
    </div>
  );
}
