import JobTitle from "./JobTitle";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Job from "./Job";
import { jobListings } from "../../constant/job";
import { Link } from "react-router";

const JobListings = () => {
  return (
    <section>
      <div className="container mx-auto p-4 mt-4">
        <JobTitle>Recent Jobs</JobTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
          {jobListings.map((job) => (
            <Job key={job.id} {...job} />
          ))}
        </div>
        
        <div className="flex justify-center items-center">
          <Link to="/jobs/alljob" className="flex items-center gap-1 text-xl text-center">
            <FaArrowAltCircleRight />
            Show All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
