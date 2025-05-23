import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { supabase } from "../../libs/supabase";
import { useAuth } from "../../hooks/useAuth";

export default function MyJobsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
            title
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setApplications(data);
      }

      setLoading(false);
    };

    fetchApplications();
  }, [user?.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {loading ? (
        <p className="text-gray-500">Loading your applications...</p>
      ) : applications.length === 0 ? (
        <div className="text-center text-gray-500">You haven't applied to any jobs yet.</div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="p-5 bg-white shadow-md rounded-2xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {app.jobs?.title || "Untitled Job"}
                </h2>
                <p className="text-sm text-gray-500">
                  Applied on {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>
              {app.resume_url ? (
                <a
                  href={app.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-medium text-sm hover:underline"
                >
                  <FaDownload className="w-4 h-4 mr-1" />
                  Download Resume
                </a>
              ) : (
                <span className="text-sm text-gray-400">No resume uploaded</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
