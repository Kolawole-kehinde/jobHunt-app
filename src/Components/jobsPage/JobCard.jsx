import { FaBriefcase, FaBolt, FaEllipsisV } from "react-icons/fa";

const JobCard = ({ job }) => {
  const { title, company, state } = job.jobs || {};
  const appliedDate = new Date(job.created_at).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="flex justify-between p-5 bg-white border rounded-xl shadow-sm">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          <FaBriefcase />
        </div>
        <div>
          <div className="mb-1">
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
              Applied
            </span>
          </div>
          <h3 className="text-lg font-bold capitalize">{title || "Untitled Job"}</h3>
          <p className="text-sm text-gray-700">{company || "Unknown Company"}</p>
          <p className="text-sm text-gray-500 mb-2">{state || "Unknown Location"}</p>
          <p className="text-sm text-gray-400">Applied on {appliedDate}</p>
          <div className="mt-2 flex items-center text-sm text-gray-600 gap-1">
            <FaBolt className="text-yellow-500" />
            <span>This employer typically responds within 1 day</span>
          </div>
          <a
            href="#"
            className="text-blue-600 mt-2 inline-flex items-center gap-1 font-medium text-sm hover:underline"
          >
            Message this employer →
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end w-40">
        <div className="flex items-center gap-2 mb-4">
          <button className="border rounded px-3 py-1 text-sm text-blue-600 hover:bg-gray-50">
            Update status
          </button>
          <FaEllipsisV className="text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
