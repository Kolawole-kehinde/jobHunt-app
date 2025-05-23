
import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../libs/supabase";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const useUserJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: jobs,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userJobs", user?.id],
    queryFn: async () => {
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
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user?.id,
    staleTime: 60000,
  });

  const refreshJobs = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["userJobs", user?.id] });
  }, [queryClient, user?.id]);

  return {
    jobs,
    isLoading,
    isError,
    isFetching,
    navigate,
    refreshJobs,
  };
};

export default useUserJobs;
