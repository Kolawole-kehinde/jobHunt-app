import { useState } from "react";
import { FaRegBookmark, FaBriefcase, FaComments, FaArchive } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import JobCard from "../../Components/jobsPage/JobCard";
import useApplications from "../../Components/jobsPage/hooks/useApplications";



const TABS = [
  { name: "Saved", icon: <FaRegBookmark /> },
  { name: "Applied", icon: <FaBriefcase /> },
  { name: "Interviews", icon: <FaComments /> },
  { name: "Archived", icon: <FaArchive /> },
];

const MyJobsPage = () => {
  const { user } = useAuth();
  const { applications, loading, error } = useApplications(user?.id);
  const [activeTab, setActiveTab] = useState("Applied");

  const isEmpty = !applications.length;

  const renderEmptyState = () => (
    <div className="text-center py-20 text-gray-500">
      <img src="/no-jobs.svg" alt="No jobs" className="mx-auto mb-6 h-40" />
      <p className="text-lg font-semibold mb-2">No jobs {activeTab.toLowerCase()} yet</p>
      <p className="text-sm">
        Jobs you {activeTab === "Saved" ? "save" : "apply to"} appear here.
      </p>
      {activeTab === "Saved" && (
        <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Find jobs →
        </button>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-8 border-b mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 ${
            activeTab === tab.name
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab.icon}
          {tab.name}
          {tab.name === "Applied" && (
            <span className="ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
              {applications.length}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My jobs</h1>
      {renderTabs()}

      {loading ? (
        <p className="text-gray-500">Loading your applications...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : activeTab !== "Applied" || isEmpty ? (
        renderEmptyState()
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Last 14 days</h2>
          <div className="space-y-4">
           {applications.map((app) => (
  <JobCard key={app.id} job={app} />
))}

          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
