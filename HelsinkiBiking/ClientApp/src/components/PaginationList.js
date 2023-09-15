import React from 'react';
import '../css/pagination.css';

const PaginationList = ({ currentPage, setCurrentPage, maxPage }) => {
    return (
        <div className="pagination">
            <div className="back-button-pagination-div">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Back</button>
            </div>
           
            {
                [...Array(maxPage).keys()].slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 2, maxPage))
                    .map((_, index, arr) => {
                        const pageNum = arr[0] + index + 1;
                        return (
                            <div className="page-number-button-pagination-div">
                                <button
                                    key={`Pagination${index + 1}`}
                                    disabled={pageNum === currentPage}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            </div>
                           
                        );
                    })
            }
            <div className="next-button-pagination-div">
                <button disabled={currentPage === maxPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
           
        </div>
    );
};
export default PaginationList;
