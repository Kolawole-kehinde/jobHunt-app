import React from 'react'

const ShowcaseSearch = () => {
  return (
    <form className="mb-4 block mx-5 md:mx-auto">
    <input
      type="text"
      name="keywords"
      placeholder="Keywords"
      className="w-full md:w-auto mb-2 px-4 py-2 focus:outline-none"
    />
    <input
      type="text"
      name="location"
      placeholder="Location"
      className="w-full md:w-auto mb-2 px-4 py-2 focus:outline-none"
    />
    <button
      className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 focus:outline-none"
    >
    <i className="fa fa-search"></i> Search
    </button>
  </form>
  )
}

export default ShowcaseSearch
