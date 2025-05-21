import React from "react";
import ConfirmModal from "../../Modal/ConfirmModal";
import CustomButton from "../../CustomBotton";
import useUserJobs from "../hooks/useUserJobs";

const UserJobs = () => {
  const {
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
  } = useUserJobs();

  return (
    <div className="bg-white shadow-md p-4 space-y-5 h-auto rounded-md shadow-blue-900">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">My Job Listings</h2>

      {isLoading ? (
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
                  disabled={isPending}
                >
                  {isPending && jobToDelete?.id === job.id ? "Deleting..." : "Delete"}
                </CustomButton>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium">Applicants</p>
              {job.applications?.length > 0 ? (
                job.applications.map((applicant) => (
                  <div key={applicant.id} className="mt-2 p-3 bg-white border rounded">
                    <p><strong>Name:</strong> {applicant.name}</p>
                    <p><strong>Phone:</strong> {applicant.phone}</p>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Message:</strong> {applicant.message}</p>

                    <div className="flex gap-4 mt-2">
                      <a
                        href={applicant.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        📄 Download Resume
                      </a>
                      <button className="text-red-600 hover:underline">
                        🗑️ Delete Applicant
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
        message={
          jobToDelete ? `Are you sure you want to delete the job: "${jobToDelete.title}"?` : ""
        }
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
};

export default UserJobs;
