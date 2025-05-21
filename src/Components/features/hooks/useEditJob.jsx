import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleJob, updateJobApi } from "../../../services/jobApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { uploadImageToCloudinary } from "../../../services/uploadImageToCloudinary";
import toast from "react-hot-toast";

const useEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // No validation here
  const { register, handleSubmit, reset } = useForm();

  // Fetch job to edit
  const { data: jobData, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJob(id),
    onSuccess: (data) => {
      reset(data); // Populate form with existing data
      setImagePreview(data?.company_logo);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateJobApi,
    onSuccess: () => {
      toast.success("Job updated successfully");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = imagePreview;

      if (image) {
        const uploaded = await uploadImageToCloudinary(image);
        if (!uploaded) {
          toast.error("Image upload failed");
          return;
        }
        imageUrl = uploaded;
      }

      mutate({
        ...data,
        id,
        user_id: user?.id,
        company_logo: imageUrl,
      });
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isPending,
    imagePreview,
    handleImageChange,
    isLoading,
  };
};

export default useEditJob;
