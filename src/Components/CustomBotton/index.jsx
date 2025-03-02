import React from 'react'

const CustomButton = ({
  children,
  type,
  ...res}) => {
  return (
     
    <button
    type={type || "submit"}
    {...res}
  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
  >
    {children}
  </button>
  )
}

export default CustomButton
