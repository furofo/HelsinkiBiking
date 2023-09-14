import React from 'react';

const PaginationList = ({ currentPage, setCurrentPage, maxPage }) => {
    return (
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Back</button>
            {
                [...Array(maxPage).keys()].slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 2, maxPage))
                    .map((_, index, arr) => {
                        const pageNum = arr[0] + index + 1;
                        return (
                            <button
                                key={pageNum}
                                disabled={pageNum === currentPage}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })
            }
            <button disabled={currentPage === maxPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
    );
};
export default PaginationList;
