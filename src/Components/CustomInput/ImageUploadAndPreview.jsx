import React from "react";
import { FaCamera } from "react-icons/fa";

const ImageUploadAndPreview = ({ imagePreview, handleImageChange, heading = "Upload Company Logo" }) => {
  return (
    <div className="space-y-4">
      <label
        htmlFor="company_logo"
        className="border-2 border-blue-500 w-[200px] h-[100px] flex items-center justify-center flex-col gap-4 p-3 rounded-lg cursor-pointer"
      >
        <span>{heading}</span>
        <input
          type="file"
          name="company_logo"
          id="company_logo"
          onChange={handleImageChange}
          hidden
        />
        {imagePreview ? (
          <img src={imagePreview} alt="logo" className="w-full h-full object-cover rounded-md" />
        ) : (
          <FaCamera fontSize={30} className="text-blue-900" />
        )}
      </label>
    </div>
  );
};

export default ImageUploadAndPreview;
