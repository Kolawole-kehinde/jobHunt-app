import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../libs/supabase";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useUserJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all jobs with their applicants
  const {
    data: jobs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["userJobs", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          applications (
            id,
            first_name,
            last_name,
            email,
            phone_number,
            resume_url
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60, 
  });

  // Invalidate and refetch jobs
  const refreshJobs = () => {
    queryClient.invalidateQueries(["userJobs", user?.id]);
  };

  // Download resume securely via signed URL
const handleDownloadResume = async (resumeUrl) => {
  try {
    const filePath = resumeUrl.split("/resumes/")[2]; 

    if (!filePath) {
      toast.error("Invalid resume URL format");
      return;
    }

    const { data, error } = await supabase.storage
      .from("resumes") 
      .createSignedUrl(filePath, 60); 

    if (error || !data?.signedUrl) {
      throw new Error(error?.message || "Could not generate signed URL");
    }

    window.open(data.signedUrl, "_blank");
  } catch (err) {
    toast.error("Failed to download resume");
    console.error("Resume download error:", err.message);
  }
};
  return {
    jobs,
    isLoading,
    isError,
    navigate,
    refreshJobs,
    handleDownloadResume,
  };
};

export default useUserJobs;
