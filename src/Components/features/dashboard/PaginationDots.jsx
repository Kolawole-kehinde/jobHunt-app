import React from "react";

const PaginationDots = ({ total, current, onChange }) => {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center mt-3 space-x-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          className={`w-3 h-3 rounded-full focus:outline-none ${
            idx === current ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => onChange(idx)}
          aria-label={`Applicant ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export default PaginationDots;
