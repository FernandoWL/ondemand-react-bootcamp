import React from 'react';
import { usePagination, DOTS } from '../../utils/hooks/usePagination'
import './pagination.css';
import PropTypes from "prop-types";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (paginationRange === undefined) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="pagination-element">
      <ul
      data-testid="pagination-container"
      className={`pagination-container ${className}`}
    >
      <li
        key={1}
        data-testid="pagination-container-prev"
        className={`pagination-item${currentPage === 1 ? ` disabled` : ''}`}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange && paginationRange.map((pageNumber, id) => {
        if (pageNumber === DOTS) {
          return <li key={id + 1} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            className={`pagination-item${pageNumber === currentPage ? ` selected` : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        key={paginationRange.length + 1}
        data-testid="pagination-container-next"
        className={`pagination-item${currentPage === lastPage ? ` disabled` : ''}`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
    </div>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
};
export default Pagination;
