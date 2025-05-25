import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { supabase } from "../../../libs/supabase";
import toast from "react-hot-toast";

const ApplicantCard = ({ applicant, onDelete }) => {
  if (!applicant) return null;

  const handleDownloadResume = async () => {
    if (!applicant.resume_url) {
      toast.error("No resume uploaded.");
      return;
    }

    try {
      const path = applicant.resume_url.includes("resumes/")
        ? applicant.resume_url.split("resumes/")[1]
        : applicant.resume_url;
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(`resumes/${path}`, 60);

      if (error || !data?.signedUrl) throw new Error(error?.message || "Failed to generate download link");

      window.open(data.signedUrl, "_blank");
    } catch (err) {
      toast.error("Failed to download resume");
      console.error(err);
    }
  };

  return (
    <div className="bg-white border rounded p-4 space-y-2 max-w-md mx-auto md:mx-0">
      <p><strong>Name:</strong> {applicant.first_name} {applicant.last_name}</p>
      <p><strong>Email:</strong> {applicant.email}</p>
      <p><strong>Phone:</strong> {applicant.phone_number}</p>

      <div className="flex flex-col gap-2 mt-3 items-center md:items-start">
        {applicant.resume_url ? (
          <button
            onClick={handleDownloadResume}
            className="text-blue-600 hover:underline flex items-center"
          >
            <FiDownload className="inline mr-1" size={16} />
            Download Resume
          </button>
        ) : (
          <span className="text-gray-400">No resume uploaded</span>
        )}

        <button
          onClick={onDelete}
          className="text-red-600 hover:underline flex items-center"
        >
          <FaTrash className="inline mr-1" size={14} />
          Delete Applicant
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
