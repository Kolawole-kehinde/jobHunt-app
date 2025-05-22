import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function ResumeUploadPage() {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
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
                Accepted file types are PDF, DOCX, RTF, or TXT.
              </p>
              {fileName && <p className="text-sm text-green-600 mt-2">{fileName}</p>}
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

        {/* Build Resume Box */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-blue-500 transition">
          <div className="flex items-start space-x-3">
            <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded font-semibold">
              Recommended
            </div>
            <div>
              <p className="text-blue-600 font-semibold">Build an jobhunt Resume</p>
              <p className="text-sm text-gray-600">
                We'll guide you through it, there are only a few steps.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          disabled={!fileName}
        >
          Continue
        </button>

       
      </div>
    </div>
  );
}
