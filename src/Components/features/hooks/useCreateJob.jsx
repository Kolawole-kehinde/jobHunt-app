import { useForm } from "react-hook-form";
import { jobSchema } from "../../../Schema/jobSchema";
import { useMutation } from "@tanstack/react-query";
import { jobCcreationApi } from "../../../services/jobApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { uploadImageToCloudinary } from "../../../services/uploadImageToCloudinary";
import { useNavigate } from "react-router";



const useCreateJob = () => {
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(""); 

  const { user } = useAuth();
  const navigate = useNavigate();
  const defaultValues = {
    title: "",
    description: "",
    salary: "",
    requirements: "",
    benefits: "",
    company: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    tags: "",
    company_website: "",
    job_type: "",
    work_mode: "",
  };

  // Function to handle image preview upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // For preview
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: jobCcreationApi,
    onSuccess: (data) => {
      if (data?.id) {
        toast.success("Job Created Successfully");
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data) => {
    try {
      // Ensure the image is valid before uploading
      if (!image) {
        toast.error("Please select an image");
        return;
      }

      const response = await uploadImageToCloudinary(image);

      if (!response) {  // Check if response is null or undefined
        toast.error("Image upload failed");
        return;
      }

      mutate({
        ...data,
        user_id: user?.id,
        company_logo: response,  // Use the image URL directly
      });

      reset();  // Reset form after submission
    } catch (error) {
      console.error("Error uploading image or submitting job:", error);
      toast.error("Something went wrong during submission");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    handleImageChange,
    image,
    imagePreview,
  };
};

export default useCreateJob;

