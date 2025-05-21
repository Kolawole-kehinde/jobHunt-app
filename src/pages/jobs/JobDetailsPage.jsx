import { FaArrowAltCircleLeft } from "react-icons/fa";
import JobDetail from "../../Components/features/jobs/jobDetail";
import JobTitle from "../../Components/features/jobs/JobTitle";
import { useAuth } from "../../hooks/useAuth";
import useJobs from "../../Components/features/hooks/useJobs";
import { useNavigate, useParams } from "react-router";
import useDeleteJob from "../../Components/features/hooks/useDeleteJob";


const Skeleton = () => (
  <div className="animate-pulse p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl shadow-lg mb-6">
    <div className="h-7 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-5 bg-gray-300 rounded w-full mb-3"></div>
    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
  </div>
);

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobId } = useParams();
  const { data, status, error } = useJobs(jobId);

  const { mutate: deleteJob, isPending } = useDeleteJob();

  if (status === "pending") {
    return (
      <section className="container mx-auto p-6 mt-6">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="container mx-auto p-6 mt-6 text-center text-red-600 font-semibold">
        <p>Error fetching job details: {error.message || "Unknown error"}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="container mx-auto p-6 mt-6 text-center text-gray-700 font-semibold">
        <p>No job found with ID: {jobId}</p>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <section className="container mx-auto p-6 max-w-4xl">
        <div className="rounded-xl shadow-xl bg-white p-8 border border-indigo-100">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-500 hover:text-indigo-800 transition-colors duration-300 font-semibold"
            >
              <FaArrowAltCircleLeft size={22} /> Back
            </button>

            {user?.id === data?.user_id && (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/jobs/edit/${jobId}`)}
                  className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md hover:bg-indigo-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this job?")) {
                      deleteJob(jobId);
                    }
                  }}
                  disabled={isPending}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium shadow-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>

          <div className="mb-6">
            <JobTitle className="text-2xl font-extrabold text-blue-500">
              {data?.title}
            </JobTitle>
            <p className="mt-3 text-gray-700 text-lg leading-relaxed">
              {data?.description}
            </p>
            <JobDetail {...data} />
          </div>

          <div className="container mx-auto p-6 max-w-4xl ">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-indigo-300 pb-2">
              Job Details
            </h2>
            <div className="rounded-xl bg-white p-8 border border-indigo-100 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-500">
                  Job Requirements
                </h3>
                <p className="text-gray-700 leading-relaxed">{data?.requirements}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-500">Benefits</h3>
                <p className="text-gray-700 leading-relaxed">{data?.benefits}</p>
              </div>
              <p className="my-6 text-center text-gray-600 italic">
                Put &quot;Job Application&quot; as the subject of your email and attach your resume.
              </p>

              <button
                className="w-full max-w-md mx-auto block px-6 py-3 rounded-md bg-blue-500 text-white text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer"
                aria-label="Apply Now"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
