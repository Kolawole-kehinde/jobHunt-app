import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { supabase } from "../../../libs/supabase";

import ConfirmModal from "../../Modal/ConfirmModal";
import useDeleteJob from "../hooks/useDeleteJob";
import { useNavigate } from "react-router";
import CustomButton from "../../CustomBotton";


const UserJobs = () => {
  const { user } = useAuth();
  const { isPending, mutate } = useDeleteJob();
  const navigate = useNavigate();

  // State for modal control and selected job to delete
  const [modalOpen, setModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // React Query: Fetch jobs
  const { data: jobs, status, isLoading, isError } = useQuery({
    queryKey: ["userJobs", user?.id ?? ""],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000,
  });

  // Handlers wrapped in useCallback for stable references
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
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          alert("Failed to delete job. Please try again.");
          // Optionally log or show error UI
        },
      });
    }
  }, [jobToDelete, mutate, closeModal]);

  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-[500px] rounded-md shadow-blue-900 relative">
      <h2 className="text-blue-900 text-2xl font-semibold">My Job Listings</h2>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-600" role="alert">
          Error fetching jobs.
        </p>
      )}

      {status === "success" && (
        <div className="space-y-4 overflow-y-auto max-h-[400px]">
          {jobs?.length === 0 ? (
            <p className="text-gray-500 italic">No job listings for this user.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50 flex justify-between items-center"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <img
                      src={job.company_logo}
                      alt={`${job.title} logo`}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <h2 className="text-xs font-bold">{job.company}</h2>
                  </div>

                  <h3 className="font-semibold text-base">{job.title}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <CustomButton
                    className="bg-blue-500 text-white py-1 px-3 rounded-md"
                    onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    aria-label={`Edit job ${job.title}`}
                  >
                    Edit
                  </CustomButton>

                  <CustomButton
                    className="w-[70px] !py-1 !px-2 bg-red-500"
                    onClick={() => openModal(job)}
                    disabled={isPending}
                    aria-label={`Delete job ${job.title}`}
                  >
                    {isPending && jobToDelete?.id === job.id ? "Deleting..." : "Delete"}
                  </CustomButton>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        message={
          jobToDelete
            ? `Are you sure you want to delete the job: "${jobToDelete.title}"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </section>
  );
};

export default UserJobs;
