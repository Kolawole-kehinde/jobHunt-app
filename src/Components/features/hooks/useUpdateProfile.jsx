import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { uploadImageToCloudinary } from "../../../services/uploadImageToCloudinary";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";

const useUpdateProfile = () => {
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState("");

  const { user } = useAuth();

  // Handle image change (preview upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // Update user profile with the new data
  const updateProfile = async (data) => {
    try {
      // Upload image if there's a new one
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }

      const { error } = await supabase
        .from("users") 
        .update({
          fullName: data.name,
          email: data.email,
          profilePicture: imageUrl || user.profilePicture,
        })
        .eq("id", user.id); 

      if (error) {
        toast.error("Failed to update profile");
        console.error("Supabase Error:", error.message);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  return {
    handleImageChange,
    imagePreview,
    updateProfile,
  };
};

export default useUpdateProfile;
