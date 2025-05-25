import React, { useState } from "react";
import ConfirmModal from "../../Modal/ConfirmModal";
import useUserJobs from "../hooks/useUserJobs";
import JobCard from "./JobCard";
import JobsPagination from "./JobsPagination";

const JOBS_PER_PAGE = 1;

const UserJobs = () => {
  const { jobs, isLoading, isError, isFetching, navigate, refreshJobs } = useUserJobs();

  const [jobsPage, setJobsPage] = useState(0);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);

  const totalPages = Math.ceil((jobs?.length || 0) / JOBS_PER_PAGE);
  const visibleJobs = jobs?.slice(jobsPage * JOBS_PER_PAGE, (jobsPage + 1) * JOBS_PER_PAGE) || [];

  // Handlers for modals and deletion would be here, passed down to JobCard and ConfirmModal

  return (
    <div className="bg-white shadow-md  shadow-blue-900 h-[600px] md:h-[550px] p-4 md:p-6 rounded-md space-y-6 ">
      <h2 className="text-2xl font-bold text-blue-900 text-center md:text-left">My Job Listings</h2>

      {isLoading || isFetching ? (
        <p className="text-center">Loading jobs...</p>
      ) : isError ? (
        <p className="text-red-600 text-center">Error loading jobs.</p>
      ) : jobs?.length === 0 ? (
        <p className="text-gray-500 italic text-center">No job listings yet.</p>
      ) : (
        visibleJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            navigate={navigate}
            refreshJobs={refreshJobs}
            onDeleteJob={(job) => {
              setJobToDelete(job);
              setModalOpen(true);
            }}
            onDeleteApplicant={(applicant) => {
              setApplicantToDelete(applicant);
              setApplicantModalOpen(true);
            }}
          />
        ))
      )}

      {totalPages > 1 && (
        <JobsPagination totalPages={totalPages} currentPage={jobsPage} onPageChange={setJobsPage} />
      )}

      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this job?"
        onConfirm={async () => {
          if (!jobToDelete) return;
          // call Supabase delete and refreshJobs here
          setModalOpen(false);
          setJobToDelete(null);
        }}
        onCancel={() => {
          setModalOpen(false);
          setJobToDelete(null);
        }}
      />

      <ConfirmModal
        isOpen={applicantModalOpen}
        message="Are you sure you want to delete this applicant?"
        onConfirm={async () => {
          if (!applicantToDelete) return;
          // call Supabase delete and refreshJobs here
          setApplicantModalOpen(false);
          setApplicantToDelete(null);
        }}
        onCancel={() => {
          setApplicantModalOpen(false);
          setApplicantToDelete(null);
        }}
      />
    </div>
  );
};

export default UserJobs;
