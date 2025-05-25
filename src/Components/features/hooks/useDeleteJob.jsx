import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { supabase } from "../../../libs/supabase";

const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (jobId) => {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Job Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isDeleting: mutation.isLoading,
    deleteJob: mutation.mutate,
  };
};

export default useDeleteJob;
