import React from "react";

const JobsPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 flex-wrap mt-6">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx)}
          className={`px-3 py-1 rounded-full border ${
            idx === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default JobsPagination;
