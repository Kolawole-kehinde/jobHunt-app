import { useState } from "react";

// Custom hook for handling image upload with validation
const useImageUpload = ({ maxSize = 5 * 1024 * 1024, validTypes = ["image/jpeg", "image/png", "image/webp"] } = {}) => {
  const [image, setImage] = useState(null);        // State for holding the selected image
  const [imagePreview, setImagePreview] = useState(""); // State for storing image preview URL

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Get the selected file

    if (!file) return; // If no file selected, exit early

    // Check if the file is one of the valid types
    if (!validTypes.includes(file.type)) {
      alert(`Invalid file type. Allowed types: ${validTypes.join(", ")}`);
      return;
    }

    // Check if the file size exceeds the maximum size
    if (file.size > maxSize) {
      alert(`File size should be under ${maxSize / (1024 * 1024)}MB.`);
      return;
    }

    setImage(file); // Set the selected image
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
  };

  // Function to reset image (e.g., clear the selected image)
  const resetImage = () => {
    setImage(null);
    setImagePreview("");
  };

  // Returning the necessary properties and functions
  return {
    image,
    imagePreview,
    handleImageChange,
    resetImage,
    setImagePreview, // Optional, in case you want to manually update preview
  };
};

export default useImageUpload;
