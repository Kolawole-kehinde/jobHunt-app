import React, { useState } from "react";
import ConfirmModal from "../../Modal/ConfirmModal";
import CustomButton from "../../CustomBotton";
import useUserJobs from "../hooks/useUserJobs";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";
import { FaTrash } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const UserJobs = () => {
  const {
    jobs,
    isLoading,
    isError,
    isFetching,
    navigate,
    refreshJobs,
  } = useUserJobs();

  const [jobToDelete, setJobToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);

  const openModal = (job) => {
    setJobToDelete(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setJobToDelete(null);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobToDelete.id);

      if (error) throw new Error(error.message);

      toast.success("Job deleted successfully.");
      refreshJobs();
    } catch (err) {
      toast.error(`Failed to delete job: ${err.message}`);
    } finally {
      closeModal();
    }
  };

  const handleDeleteApplicant = (applicant) => {
    setApplicantToDelete(applicant);
    setApplicantModalOpen(true);
  };

  const confirmDeleteApplicant = async () => {
    if (!applicantToDelete) return;

    try {
      const { id, resume_url } = applicantToDelete;

      if (resume_url) {
        await supabase.storage.from("resumes").remove([resume_url]);
      }

      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);

      toast.success("Applicant deleted.");
      refreshJobs();
    } catch (err) {
      toast.error(`Failed to delete applicant: ${err.message}`);
    } finally {
      setApplicantModalOpen(false);
      setApplicantToDelete(null);
    }
  };

  const handleDownloadResume = async (resumeUrl) => {
    try {
      const path = resumeUrl.includes("resumes/") ? resumeUrl.split("resumes/")[1] : resumeUrl;

      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(`resumes/${path}`, 60);

      if (error || !data?.signedUrl) throw new Error(error?.message || "Signed URL error");

      window.open(data.signedUrl, "_blank");
    } catch (err) {
      toast.error("Failed to download resume");
      console.error("Resume download error:", err.message);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 space-y-5 h-auto rounded-md shadow-blue-900">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">My Job Listings</h2>

      {isLoading || isFetching ? (
        <p>Loading jobs...</p>
      ) : isError ? (
        <p className="text-red-600">Error loading jobs.</p>
      ) : jobs?.length === 0 ? (
        <p className="text-gray-500 italic">No job listings yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="mb-6 border rounded p-4 shadow-sm bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.type}</p>
              </div>
              <div className="flex gap-3">
                <CustomButton
                  className="bg-blue-500 text-white py-1 px-3 rounded-md"
                  onClick={() => navigate(`/jobs/edit/${job.id}`)}
                >
                  Edit
                </CustomButton>
                <CustomButton
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                  onClick={() => openModal(job)}
                >
                 
                  Delete
                </CustomButton>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium">Applicants</p>
              {job.applications?.length > 0 ? (
                job.applications.map((applicant) => (
                  <div key={applicant.id} className="mt-2 p-3 bg-white border rounded space-y-1">
                    <p><strong>Name:</strong> {applicant.first_name} {applicant.last_name}</p>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Phone:</strong> {applicant.phone_number}</p>

                    <div className="flex gap-4 mt-2 items-center">
                      {applicant.resume_url ? (
                        <button
                          onClick={() => handleDownloadResume(applicant.resume_url)}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FiDownload className="inline mr-1" size={16} />
                          Download Resume
                        </button>
                      ) : (
                        <span className="text-gray-400">No resume uploaded</span>
                      )}

                      <button
                        className="text-red-600 hover:underline flex items-center"
                        onClick={() => handleDeleteApplicant(applicant)}
                      >
                        <FaTrash className="inline mr-1" size={14} />
                        Delete Applicant
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic mt-1">No applicants for this job</p>
              )}
            </div>
          </div>
        ))
      )}

      <ConfirmModal
        isOpen={modalOpen}
        message={`Are you sure you want to delete the job "${jobToDelete?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
      <ConfirmModal
        isOpen={applicantModalOpen}
        message={`Delete applicant "${applicantToDelete?.first_name} ${applicantToDelete?.last_name}" and their resume?`}
        onConfirm={confirmDeleteApplicant}
        onCancel={() => {
          setApplicantModalOpen(false);
          setApplicantToDelete(null);
        }}
      />
    </div>
  );
};

export default UserJobs;
