import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";
import useDeleteApplicant from "./useDeleteApplicant";

export const useApplicantActions = (applicant) => {
  const { isDeleting, deleteApplicant } = useDeleteApplicant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownloadResume = async () => {
    if (!applicant?.resume_url) {
      toast.error("No resume uploaded.");
      return;
    }

    try {
      const relativePath = applicant.resume_url;

      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(relativePath, 60);

      if (error || !data?.signedUrl)
        throw new Error(error?.message || "Failed to generate download link");

      const res = await fetch(data.signedUrl);
      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const fileExtension = relativePath.split(".").pop();
      const filename = `${applicant.first_name}_${applicant.last_name}_resume.${fileExtension}`;

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      toast.error("Failed to download resume");
      console.error(err);
    }
  };

  const handleConfirmDelete = () => {
    if (!applicant?.id) {
      toast.error("Applicant ID missing");
      closeModal();
      return;
    }
    deleteApplicant(
      { id: applicant.id, resume_url: applicant.resume_url },
      {
        onSettled: () => {
          closeModal();
        },
      }
    );
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleDownloadResume,
    handleConfirmDelete,
    isDeleting,
  };
};
