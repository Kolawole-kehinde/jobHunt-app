import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { jobSchema } from "../../../Schema/jobSchema";
import { useMutation } from "@tanstack/react-query";
import { jobCcreationApi } from "../../../services/jobApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";


const useCreateJob = () => {
  const [image, setImage] = useState([]); // State to store the image file
  const [imagePreview, setImagePreview] = useState([]); // State to store the image preview URL

  const {user} = useAuth();
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
  };


  // Function to handle image preview upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // For preview
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues, // Set default values
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
    const res = await uploadImageToCloudinary(image); // Assuming you have a function to upload the image to Cloudinary
     console.log(res)
    mutate({
      ...data,
       user_id:  user?.id,
       company_logo: image, // Add the image URL to the data
    })
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending ,
    handleImageChange,
    image,
    imagePreview,
  };
};

export default useCreateJob;
