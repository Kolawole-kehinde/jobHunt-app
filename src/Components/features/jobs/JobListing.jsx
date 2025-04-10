import JobTitle from "./JobTitle";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Job from "./Job";
import { Link } from "react-router";
import { JobSkeletonLoader } from "../../JobSkeletonLoader";


const JobListings = ({ title = "Recent Jobs", ShowAllJobsBtn = true, status, jobs, error }) => {
  return (
    <section>
      <div className="container mx-auto p-4 mt-4">
        <JobTitle>{title}</JobTitle>

        {status === "error" && (
          <h4 className="h-[400px] flex justify-center items-center">
            <p className="text-3xl lg:text-4xl font-bold text-blue-500">{error.message}</p>
          </h4>
        )}

        {status === "loading" && <JobSkeletonLoader />}

        {jobs?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
            {jobs?.map((job) => (
              <Job key={job.id} {...job} />
            ))}
          </div>
        )}

        {ShowAllJobsBtn && jobs?.length > 0 && (
          <div className="flex justify-center items-center">
            <Link
              to="/jobs"
              className="flex items-center gap-1 text-xl text-center"
            >
              <FaArrowAltCircleRight />
              Show All Jobs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
