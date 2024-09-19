
import React from 'react';
import '../Styles/PaginationControl.css';


function PaginationControls({ page, maxPages, goToPreviousPage, goToNextPage, isFirstPage, isLastPage }) {
  return (
    <div className="pagination-controls">
      <button
        onClick={goToPreviousPage}
        disabled={isFirstPage}
        className="prev-page"
      >
        Previous
      </button>
      <span>Page {page} of {maxPages}</span>
      <button
        onClick={goToNextPage}
        disabled={isLastPage}
        className="next-page"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
