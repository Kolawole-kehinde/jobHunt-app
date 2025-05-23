import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../libs/supabase";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa";

export default function ResumeReviewPage() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!user?.id || !jobId) return;
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .single();

      if (error) console.error("Fetch error:", error.message);
      else setApplication(data);
    };

    fetchApplication();
  }, [user, jobId]);

  if (!application) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 flex items-center gap-2">
          <FaArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => navigate("/dashboard")} className="text-sm font-medium text-blue-600">
          Save and close
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 rounded mb-6">
        <div className="w-full h-full bg-blue-600 rounded"></div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mb-6">Please review your application</h1>

      {/* Contact Section */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-700">Contact information</h2>
        <button className="text-sm text-blue-600">Edit</button>
      </div>

      <div className="space-y-4 border rounded-xl p-4 mb-6">
        <div>
          <p className="text-xs text-gray-500">Full Name</p>
          <p className="font-medium">{application.first_name} {application.last_name}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Email Address</p>
          <p className="font-medium">{application.email}</p>
          <p className="text-xs text-gray-500 mt-1">
            To mitigate fraud, your email may be masked. If masked, the employer will see an address like
            <span className="font-mono ml-1 text-gray-600">someone_574@indeedemail.com</span>.
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">City, State</p>
          <p className="font-medium">{application.city}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Phone Number</p>
          <p className="font-medium">{application.phone_number}</p>
        </div>
      </div>

      {/* Resume Section */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-700">CV</h2>
        <button className="text-sm text-blue-600">Edit</button>
      </div>

      <div className="flex items-center gap-3 border rounded-xl p-4 bg-gray-50">
        <FaFilePdf className="text-blue-600 w-5 h-5" />
        {application.resume_url ? (
          <a
            href={application.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline font-medium"
          >
            {decodeURIComponent(application.resume_url.split("/").pop())}
          </a>
        ) : (
          <span className="text-red-600">No resume uploaded</span>
        )}
      </div>
    </div>
  );
}
