
import { useState } from "react";
import useJobs from "./useJobs";
import useDeleteJob from "./useDeleteJob";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";

const useJobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { user } = useAuth();
  const { data, status, error } = useJobs(jobId);
  const { mutate: deleteJob, isPending } = useDeleteJob();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    deleteJob(jobId);
    setIsModalOpen(false);
  };
  const handleCancelDelete = () => setIsModalOpen(false);

  return {
    data,
    status,
    error,
    user,
    isPending,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    navigate,
    jobId,
  };
};

export default useJobDetails;
