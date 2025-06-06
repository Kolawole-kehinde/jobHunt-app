import { Link } from "react-router";
import JobDetails from "./jobDetail";
import JobTitle from "./JobTitle";

const Job = (props) => {
  const { title, description, salary, city, state, tags, id, company_logo, company } = props;

  return (
    <div className="rounded-lg shadow-md bg-white">
      <div className="px-4">
        {company_logo && <img src={company_logo} alt="Company Logo" className="size-20" />}
        <JobTitle className="text-blue-500 capitalize text-xl">{company}</JobTitle>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700 text-lg mt-2">{description}</p>
        <JobDetails salary={salary} city={city} state={state} tags={tags} />
        <Link
          to={`/jobs/${id}`} 
          className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Job;
