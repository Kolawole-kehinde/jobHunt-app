import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useApplicantActions } from "../hooks/useApplicantActions";
import ConfirmModal from "../../Modal/ConfirmModal";


const ApplicantCard = ({ applicant }) => {
  const {
    isModalOpen,
    openModal,
    closeModal,
    handleDownloadResume,
    handleConfirmDelete,
    isDeleting,
  } = useApplicantActions(applicant);

  if (!applicant) return null;

  return (
    <>
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
            onClick={openModal}
            disabled={isDeleting}
            className={`flex items-center ${
              isDeleting ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:underline"
            }`}
          >
            <FaTrash className="inline mr-1" size={14} />
            {isDeleting ? "Deleting..." : "Delete Applicant"}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
        message={`Are you sure you want to delete applicant ${applicant.first_name} ${applicant.last_name}?`}
      />
    </>
  );
};

export default ApplicantCard;
