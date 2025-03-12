import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const CustomInput = ({
  label,
  type,
  name,
  placeholder,
  className="w-full px-4 py-2 border rounded focus:outline-none"}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleShowPassword = () => {
    return  setShowPassword((prevState) => !prevState);
    }
  return (
    <div className="mb-4 relative">
          {
            label && <label htmlFor={name}></label>
          }
           <div>
           <input
            type={showPassword && type === "password" ? "text" : type}
            name={name}
            placeholder={placeholder}
            className={className}
          />
          {
            type === "password" && (
              <div className=' absolute right-2 top-1/2 -translate-y-1/2'>
                {showPassword ? (<FaEye onClick={handleShowPassword} className='cursor-pointer'/>) : (<FaEyeSlash onClick={handleShowPassword} className='cursor-pointer'/>)}
              </div>
            )
          }
           </div>
        </div>
  )
}

export default CustomInput;
