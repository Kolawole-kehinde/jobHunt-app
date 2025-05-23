import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { supabase } from "../../libs/supabase";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user?.id || !jobId) {
      toast.error("Missing file, user or job.");
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const filePath = `resumes/${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      const resumeUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('applications')
        .update({ resume_url: resumeUrl })
        .eq('user_id', user.id)
        .eq('job_id', jobId);

      if (updateError) throw updateError;

      toast.success("Resume uploaded successfully!");
      navigate("/"); // or redirect to jobs page/dashboard
    } catch (err) {
      console.error(err);
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add a resume for the employer
        </h1>

        {/* Upload Box */}
        <label className="block border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
          <div className="flex items-center space-x-4">
            <FaUpload className="text-gray-500 text-xl" />
            <div>
              <p className="text-blue-600 font-semibold">Upload a resume</p>
              <p className="text-sm text-gray-500">
                Accepted file types: PDF, DOCX, RTF, or TXT.
              </p>
              {file && (
                <p className="text-sm text-green-600 mt-2">{file.name}</p>
              )}
            </div>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.rtf,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Build Resume Box (optional) */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-blue-500 transition">
          <div className="flex items-start space-x-3">
            <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded font-semibold">
              Recommended
            </div>
            <div>
              <p className="text-blue-600 font-semibold">
                Build a jobhunt Resume
              </p>
              <p className="text-sm text-gray-600">
                We'll guide you through it, just a few steps.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full mt-6 font-semibold py-2 rounded-lg transition ${
            !file || uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
