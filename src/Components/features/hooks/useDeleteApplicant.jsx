import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";

const useDeleteApplicant = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, resume_url }) => {
      // Remove resume from storage if exists
      if (resume_url) {
        const { error: storageError } = await supabase.storage.from("resumes").remove([resume_url]);
        if (storageError) throw storageError;
      }

      // Delete applicant record
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Applicant deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isDeleting: mutation.isLoading,
    deleteApplicant: mutation.mutate,
  };
};

export default useDeleteApplicant;
