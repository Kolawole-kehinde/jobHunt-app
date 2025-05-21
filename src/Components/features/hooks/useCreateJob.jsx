import { useForm } from "react-hook-form";
import { jobSchema } from "../../../Schema/jobSchema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { uploadImageToCloudinary } from "../../../services/uploadImageToCloudinary";
import { useNavigate } from "react-router";
import { jobCcreationApi, updateJobApi } from "../../../services/craeateAndUpdateJobApi";

const useCreateJob = ({ initialData = null, isEdit = false }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.company_logo || "");

  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData || {
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
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
      setImagePreview(initialData.company_logo);
    }
  }, [initialData, setValue]);

  const { isPending, mutate } = useMutation({
    mutationFn: isEdit ? updateJobApi : jobCcreationApi,
    onSuccess: (data) => {
      toast.success(isEdit ? "Job Updated Successfully" : "Job Created Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
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
        const response = await uploadImageToCloudinary(image);
        if (!response) {
          toast.error("Image upload failed");
          return;
        }
        imageUrl = response;
      }

      const payload = {
        ...data,
        user_id: user?.id,
        company_logo: imageUrl,
      };

      if (isEdit) payload.id = initialData?.id;

      mutate(payload);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    handleImageChange,
    imagePreview,
  };
};

export default useCreateJob;
