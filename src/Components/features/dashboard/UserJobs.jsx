import React, { useState, useRef } from "react";
import ConfirmModal from "../../Modal/ConfirmModal";
import CustomButton from "../../CustomBotton";
import useUserJobs from "../hooks/useUserJobs";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";
import { FaTrash } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const SWIPE_THRESHOLD = 50; // minimum px for swipe to count
const JOBS_PER_PAGE = 1; // Show 2 jobs per page

const UserJobs = () => {
  const { jobs, isLoading, isError, isFetching, navigate, refreshJobs } = useUserJobs();

  // Pagination state for jobs
  const [jobsPage, setJobsPage] = useState(0);

  // Track current applicant page per job id
  const [applicantPage, setApplicantPage] = useState({});

  // Track touch positions for swipe detection per job
  const touchStartX = useRef({});

  // Modals state
  const [jobToDelete, setJobToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);

  // Swipe handlers
  const handleTouchStart = (jobId, e) => {
    touchStartX.current[jobId] = e.touches[0].clientX;
  };

  const handleTouchEnd = (jobId, e, applicantsLength) => {
    if (!touchStartX.current[jobId]) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current[jobId];

    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX < 0) {
        // Swipe left -> next applicant
        setApplicantPage((prev) => {
          const current = prev[jobId] || 0;
          return {
            ...prev,
            [jobId]: Math.min(current + 1, applicantsLength - 1),
          };
        });
      } else {
        // Swipe right -> prev applicant
        setApplicantPage((prev) => {
          const current = prev[jobId] || 0;
          return {
            ...prev,
            [jobId]: Math.max(current - 1, 0),
          };
        });
      }
    }

    touchStartX.current[jobId] = null;
  };

  // Open job delete confirmation modal
  const openJobDeleteModal = (job) => {
    setJobToDelete(job);
    setModalOpen(true);
  };

  // Close job delete modal and reset
  const closeJobDeleteModal = () => {
    setModalOpen(false);
    setJobToDelete(null);
  };

  // Confirm delete job
  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobToDelete.id);
      if (error) throw new Error(error.message);

      toast.success("Job deleted successfully.");
      refreshJobs();
    } catch (err) {
      toast.error(`Failed to delete job: ${err.message}`);
    } finally {
      closeJobDeleteModal();
    }
  };

  // Open applicant delete modal
  const openApplicantDeleteModal = (applicant) => {
    setApplicantToDelete(applicant);
    setApplicantModalOpen(true);
  };

  // Confirm delete applicant
  const confirmDeleteApplicant = async () => {
    if (!applicantToDelete) return;

    try {
      const { id, resume_url } = applicantToDelete;

      if (resume_url) {
        await supabase.storage.from("resumes").remove([resume_url]);
      }

      const { error } = await supabase.from("applications").delete().eq("id", id);
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

  // Download resume securely
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

  // Handle numbered page button click for applicants
  const handleApplicantPageChange = (jobId, newIndex) => {
    setApplicantPage((prev) => ({ ...prev, [jobId]: newIndex }));
  };

  // Render numbered pagination buttons for applicants
  const renderPaginationNumbers = (jobId, applicantsLength, currentPage) => {
    if (applicantsLength <= 1) return null;

    return (
      <div className="flex justify-center mt-3 space-x-2">
        {Array.from({ length: applicantsLength }).map((_, idx) => (
          <button
            key={idx}
            aria-label={`Show applicant ${idx + 1}`}
            className={`px-3 py-1 rounded-full border ${
              idx === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
            } focus:outline-none`}
            onClick={() => handleApplicantPageChange(jobId, idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    );
  };

  // Calculate total pages and paginated jobs for job pagination
  const totalJobPages = jobs ? Math.ceil(jobs.length / JOBS_PER_PAGE) : 0;
  const paginatedJobs = jobs
    ? jobs.slice(jobsPage * JOBS_PER_PAGE, jobsPage * JOBS_PER_PAGE + JOBS_PER_PAGE)
    : [];

  // Job page change handler
  const handleJobsPageChange = (newPage) => {
    setJobsPage(newPage);
  };

  return (
    <div className="bg-white shadow-md h-[600px] md:h-[550px] p-6 rounded-md shadow-blue-900 space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">My Job Listings</h2>

      {(isLoading || isFetching) && <p>Loading jobs...</p>}
      {isError && <p className="text-red-600">Error loading jobs.</p>}

      {!isLoading && !isError && jobs?.length === 0 && (
        <p className="text-gray-500 italic">No job listings yet.</p>
      )}

      {!isLoading &&
        !isError &&
        paginatedJobs.map((job) => {
          const applicants = job.applications || [];
          const currentPage = applicantPage[job.id] || 0;
          const currentApplicant = applicants[currentPage];

          return (
            <div
              key={job.id}
              className="border rounded p-5 shadow-sm bg-gray-50"
              onTouchStart={(e) => handleTouchStart(job.id, e)}
              onTouchEnd={(e) => handleTouchEnd(job.id, e, applicants.length)}
            >
              {/* Job Header */}
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
                    onClick={() => openJobDeleteModal(job)}
                  >
                    Delete
                  </CustomButton>
                </div>
              </div>

              {/* Applicants Section */}
              <div className="mt-6">
                <p className="font-medium mb-3">Applicants</p>

                {applicants.length === 0 && (
                  <p className="text-gray-500 italic">No applicants for this job</p>
                )}

                {applicants.length > 0 && currentApplicant && (
                  <div className="bg-white border rounded p-4 space-y-2">
                    <p>
                      <strong>Name:</strong> {currentApplicant.first_name} {currentApplicant.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentApplicant.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {currentApplicant.phone_number}
                    </p>

                    <div className="flex flex-col gap-2 mt-3">
                      {currentApplicant.resume_url ? (
                        <button
                          onClick={() => handleDownloadResume(currentApplicant.resume_url)}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FiDownload className="inline mr-1" size={16} />
                          Download Resume
                        </button>
                      ) : (
                        <span className="text-gray-400">No resume uploaded</span>
                      )}

                      <button
                        onClick={() => openApplicantDeleteModal(currentApplicant)}
                        className="text-red-600 hover:underline flex items-center"
                      >
                        <FaTrash className="inline mr-1" size={14} />
                        Delete Applicant
                      </button>
                    </div>
                  </div>
                )}

                {/* Pagination Numbers for Applicants */}
                {renderPaginationNumbers(job.id, applicants.length, currentPage)}
              </div>
            </div>
          );
        })}

      {/* Jobs Pagination Controls */}
      {totalJobPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalJobPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleJobsPageChange(idx)}
              className={`px-3 py-1 rounded-full border ${
                idx === jobsPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
              }`}
              aria-label={`Go to job page ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Confirm Modals */}
      <ConfirmModal
        isOpen={modalOpen}
        message={`Are you sure you want to delete the job "${jobToDelete?.title}"?`}
        onConfirm={confirmDeleteJob}
        onCancel={closeJobDeleteModal}
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
