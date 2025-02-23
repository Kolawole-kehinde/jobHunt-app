import React from 'react'

const JobTitle = ({ children }) => {
  return (
    <div className="text-center text-3xl mb-4 font-bold border border-gray-300 p-3">
        {children }
    </div>
  )
}

export default JobTitle
