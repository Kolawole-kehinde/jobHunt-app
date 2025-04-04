import React from 'react'
import { Link } from 'react-router'

const ButtomBanner = () => {
  return (
    <section className="my-6">
      <div
        className="bg-blue-800 "
      >
        <div className='container mx-auto text-white rounded p-4 flex items-center justify-between'>
        <div>
          <h2 className="text-xl font-semibold">Looking to hire?</h2>
          <p className="text-gray-200 text-lg mt-2">
            Post your job listing now and find the perfect candidate.
          </p>
        </div>
        <Link to="/jobs/jobcreation"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded hover:shadow-md transition duration-300"
        >
          <i className="fa fa-edit"></i> Post a Job
        </Link>
        </div>
      </div>
    </section>
  )
}

export default ButtomBanner
