import React from 'react'
import { FaCamera } from 'react-icons/fa'

const ImageUploadAndPreview = ({imagePreview, handleImageChange}) => {
  return (
    <div className='space-y-4'>
        <label htmlFor="company_logo" className=" border border-gray-500 w-[200px] flex items-center justify-center flex-col gap-4 p-3 rounded-lg cursor-pointer">
                    <span >Upload company logo</span>
                    <input
                      type="file"
                      name="company_logo"
                      id="company_logo"
                      onChange={handleImageChange}
                      hidden
                    />
                    {imagePreview.length > 0 ? (
                      <img src={imagePreview} alt="logo" className="" />
                    ) : (
                      <FaCamera fontSize={30}/>
                    )}
                  </label>
    </div>
  )
}

export default ImageUploadAndPreview