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
      const url = new URL(applicant.resume_url);
      const parts = url.pathname.split("/resumes/");
      if (parts.length < 2) throw new Error("Invalid resume URL");
      const pathInBucket = parts[1]; 

      // Generate a signed URL for the file in the private bucket
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(pathInBucket, 60)

      if (error || !data?.signedUrl)
        throw new Error(error?.message || "Failed to generate download link");

      // Fetch the file from the signed URL
      const res = await fetch(data.signedUrl);
      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = pathInBucket.split("/").pop() || "resume.pdf"; // file name
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      toast.error("Failed to download resume");
      console.error(err);
    }
  };

  return (
    <div className="bg-white border rounded p-4 space-y-2 max-w-md mx-auto md:mx-0">
      <p>
        <strong>Name:</strong> {applicant.first_name} {applicant.last_name}
      </p>
      <p>
        <strong>Email:</strong> {applicant.email}
      </p>
      <p>
        <strong>Phone:</strong> {applicant.phone_number}
      </p>

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
