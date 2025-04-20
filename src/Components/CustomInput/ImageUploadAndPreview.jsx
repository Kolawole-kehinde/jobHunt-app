import React from "react";
import { FaCamera } from "react-icons/fa";

const ImageUploadAndPreview = ({
  imagePreview,
  handleImageChange,
  heading = "Upload Company Logo",
  labelFor = "company_logo",
  imgClassName = "w-full h-full object-cover rounded-md",
  containerClassName = "border-2 border-blue-500 w-[200px] h-[100px] flex items-center justify-center flex-col gap-4 p-3 rounded-lg cursor-pointer",
}) => {
  return (
    <div className="space-y-4">
      <label
        htmlFor={labelFor}
        className={containerClassName}
        aria-label="Upload an image"
      >
        <span>{heading}</span>
        <input
          type="file"
          name={labelFor}
          id={labelFor}
          onChange={handleImageChange}
          hidden
          aria-label="Upload image"
        />
        {imagePreview ? (
          <img src={imagePreview} alt="logo preview" className={imgClassName} />
        ) : (
          <FaCamera fontSize={30} className="text-blue-900" />
        )}
      </label>
    </div>
  );
};

export default ImageUploadAndPreview;
