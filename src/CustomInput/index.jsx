import React from 'react'

const CustomInput = ({label, type, name,  placeholder, className, ...res}) => {
  return (
    <div className="mb-4">
          {
            label && <label htmlFor={name}></label>
          }
           <div>
           <input
            type={type || "text"}
            name={name}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${className}`}
           { ...res}
          />
           </div>
        </div>
  )
}

export default CustomInput;
