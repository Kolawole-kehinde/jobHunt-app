// hooks/useUserJobs.js
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { supabase } from "../../../libs/supabase";
import useDeleteJob from "../hooks/useDeleteJob";
import { useAuth } from "../../../hooks/useAuth";

const useUserJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteJob();

  const [modalOpen, setModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["userJobs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user?.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 60000,
  });

  const openModal = useCallback((job) => {
    setJobToDelete(job);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setJobToDelete(null);
    setModalOpen(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (jobToDelete) {
      mutate(jobToDelete.id, {
        onSuccess: closeModal,
        onError: () => alert("Failed to delete job. Please try again."),
      });
    }
  }, [jobToDelete, mutate, closeModal]);

  return {
    jobs,
    isLoading,
    isError,
    isPending,
    navigate,
    modalOpen,
    jobToDelete,
    openModal,
    closeModal,
    confirmDelete,
  };
};

export default useUserJobs;
