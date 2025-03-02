import React from 'react'
import CustomButton from '../CustomBotton'
import CustomInput from '../../CustomInput'
import { FaSearch } from "react-icons/fa";

const ShowcaseSearch = () => {
    const SearchInput =[
        {
         name: "keywords",
        placeholder: "Keywords",
       },
        {
        name: "location",
        placeholder: "Location",
        }
    ]
  return (
    <form className="items-center md:flex block md:space-y-0 space-y-4 px-4">
        {
            SearchInput.map(({name, placeholder}) =>(
                <CustomInput
                key={name}
                name={name}
                placeholder={placeholder}
                className="w-full md:w-auto px-4 py-2 focus:outline-none"
                />
            ))
        }
    <CustomButton
      className="md:w-auto px-4 py-2 flex items-center gap-2"
    >
    <FaSearch />Search
    </CustomButton>
  </form>
  )
}

export default ShowcaseSearch
