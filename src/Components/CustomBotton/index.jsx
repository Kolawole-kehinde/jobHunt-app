import React from 'react'

const CustomButton = ({
  children,
  type,
  ...res}) => {
  return (
     
    <button
    type={type || "submit"}
    {...res}
  className="w-full md:w-[150px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 flex items-center justify-center gap-4  focus:outline-none"
>
    {children}
  </button>
  )
}

export default CustomButton
