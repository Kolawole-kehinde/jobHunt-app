import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { jobSchema } from "../../../Schema/jobSchema";
import { useMutation } from "@tanstack/react-query";
import { jobCcreationApi } from "../../../services/jobApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";


const useCreateJob = () => {
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

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending };
};

export default useCreateJob;
