import { useEffect, useState } from "react";
import {
  FaRegBookmark,
  FaBriefcase,
  FaComments,
  FaArchive,
  FaBolt,
  FaFileDownload,
  FaEllipsisV,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../libs/supabase";

const tabs = [
  { name: "Saved", icon: <FaRegBookmark /> },
  { name: "Applied", icon: <FaBriefcase /> },
  { name: "Interviews", icon: <FaComments /> },
  { name: "Archived", icon: <FaArchive /> },
];

export default function MyJobsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Applied");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          created_at,
          resume_url,
          job_id,
          jobs (
            title,
            company,
            state
            
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setApplications(data);
      setLoading(false);
    };

    fetchApplications();
  }, [user?.id]);

  const renderEmptyState = () => (
    <div className="text-center py-20 text-gray-500">
      <img src="/no-jobs.svg" alt="No jobs" className="mx-auto mb-6 h-40" />
      <p className="text-lg font-semibold mb-2">No jobs {activeTab.toLowerCase()} yet</p>
      <p className="text-sm">Jobs you {activeTab === "Saved" ? "save" : "apply to"} appear here.</p>
      {activeTab === "Saved" && (
        <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Find jobs →
        </button>
      )}
    </div>
  );

  const renderAppliedJobs = () => (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Last 14 days
      </h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="flex justify-between p-5 bg-white border rounded-xl shadow-sm"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                <FaBriefcase />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    Applied
                  </span>
                </div>
                <h3 className="text-lg font-bold capitalize">
                  {app.jobs?.title || "Untitled Job"}
                </h3>
                <p className="text-sm text-gray-700">
                  {app.jobs?.company || "Unknown Company"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {app.jobs?.state || "Unknown Location"}
                </p>
                <p className="text-sm text-gray-400">
                  Applied on {new Date(app.created_at).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
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
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My jobs</h1>

      {/* Tabs */}
      <div className="flex space-x-8 border-b mb-6">
        {tabs.map((tab) => (
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
            {tab.name}{" "}
            {tab.name === "Applied" && (
              <span className="ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading your applications...</p>
      ) : activeTab !== "Applied" ? (
        renderEmptyState()
      ) : applications.length === 0 ? (
        renderEmptyState()
      ) : (
        renderAppliedJobs()
      )}
    </div>
  );
}
