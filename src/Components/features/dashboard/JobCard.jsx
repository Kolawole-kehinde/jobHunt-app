import React, { useState, useRef } from "react";
import CustomButton from "../../CustomBotton";
import ApplicantCard from "./ApplicantCard";
import PaginationDots from "./PaginationDots";

const SWIPE_THRESHOLD = 50;

const JobCard = ({ job, navigate, refreshJobs, onDeleteJob, onDeleteApplicant }) => {
  const applicants = job.applications || [];
  const [applicantPage, setApplicantPage] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;

    const touchEndX = e.changedTouches[0]?.clientX ?? 0;
    const diffX = touchEndX - touchStartX.current;

    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      setApplicantPage((current) => {
        if (diffX < 0) {
          return Math.min(current + 1, applicants.length - 1);
        } else {
          return Math.max(current - 1, 0);
        }
      });
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="border rounded p-4 md:p-6 shadow-sm bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.type}</p>
        </div>
        <div className="flex gap-3 mt-3 md:mt-0">
          <CustomButton
            className="bg-blue-500 text-white py-1 px-4 rounded-md text-sm md:text-base"
            onClick={() => navigate(`/jobs/edit/${job.id}`)}
          >
            Edit
          </CustomButton>
          <CustomButton
            className="bg-red-500 text-white py-1 px-4 rounded-md text-sm md:text-base"
            onClick={() => onDeleteJob(job)}
          >
            Delete
          </CustomButton>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-3 text-center md:text-left">Applicants</p>

        {applicants.length === 0 ? (
          <p className="text-gray-500 italic text-center md:text-left">No applicants for this job</p>
        ) : (
          <ApplicantCard
            applicant={applicants[applicantPage]}
            onDelete={() => onDeleteApplicant(applicants[applicantPage])}
          />
        )}

        <PaginationDots
          total={applicants.length}
          current={applicantPage}
          onChange={setApplicantPage}
        />
      </div>
    </div>
  );
};

export default JobCard;
