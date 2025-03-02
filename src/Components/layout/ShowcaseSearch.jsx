import React from 'react'
import CustomButton from '../CustomButton'

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
    <CustomButton>
     
    <i className="fa fa-search"></i> Search
    </CustomButton>
  </form>
  )
}

export default ShowcaseSearch
