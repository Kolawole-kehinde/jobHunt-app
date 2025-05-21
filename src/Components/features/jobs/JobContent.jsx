import JobDetail from "./jobDetail";
import JobTitle from "./JobTitle";

const JobContent = ({ title, description, job }) => (
  <div className="mb-6">
    <JobTitle className="text-2xl font-extrabold text-blue-500">{title}</JobTitle>
    <p className="mt-3 text-gray-700 text-lg leading-relaxed">{description}</p>
    <JobDetail {...job} />
  </div>
);
export default JobContent;
