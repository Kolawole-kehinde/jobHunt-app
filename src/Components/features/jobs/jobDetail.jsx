import React from 'react';

const JobDetail = ({ salary, city, state, tags }) => {
  return (
    <div>
      <ul className="my-4 bg-gray-100 p-4 rounded">
        <li className="mb-2">
          <strong>Salary:</strong> ${salary}
        </li>
        <li className="mb-2">
          <strong>Location:</strong> {`${city} ${state}`}
          <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
            Local
          </span>
        </li>
        <li className="mb-2 capitalize">
          <strong>Tagss:</strong> <span>{tags}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobDetail;
