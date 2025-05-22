import { Link } from "react-router";


const JobInfoSection = ({ requirements, benefits, jobId }) => {
  console.log("🧪 jobId passed to JobInfoSection:", jobId);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-indigo-300 pb-2">
        Job Details
      </h2>
      <div className="rounded-xl bg-white p-8 border border-indigo-100 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-500">
            Job Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed">{requirements}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-500">Benefits</h3>
          <p className="text-gray-700 leading-relaxed">{benefits}</p>
        </div>
        <p className="my-6 text-center text-gray-600 italic">
          Put &quot;Job Application&quot; as the subject of your email and attach your resume.
        </p>
        <Link
          to={`/apply/${jobId}`}
          className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-500 text-white text-lg font-semibold text-center rounded-md shadow-lg hover:bg-blue-600"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobInfoSection;
