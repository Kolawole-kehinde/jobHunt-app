
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationSubmittedModal from "../../Components/Modal/ApplicationSubmittedModal";
import { useState } from "react";
import { useReviewApplication } from "../../Components/features/hooks/useReviewApplication";
import ContactInfo from "../../Components/resume/ContactInfo";

export default function ResumeReviewPage() {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

const {
    application,
    formData,
    editing,
    saving,
    toggleEdit,
    handleChange,
    handleSave,
  } = useReviewApplication(user?.id, jobId);

  if (!application) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 flex items-center gap-2">
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-blue-600 font-semibold"
        >
          {saving ? "Saving..." : "Save and close"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Please review your application</h2>

      <ContactInfo
        editing={editing}
        toggleEdit={toggleEdit}
        formData={formData}
        handleChange={handleChange}
      />

      <button
        onClick={() => setShowSubmittedModal(true)}
        disabled={showSubmittedModal}
        className="bg-blue-600 text-white w-full py-3 rounded-xl text-center font-semibold mt-4 hover:bg-blue-700 disabled:opacity-50"
      >
        Submit your application
      </button>

      {showSubmittedModal && (
        <ApplicationSubmittedModal
          email={application.email}
          onClose={() => setShowSubmittedModal(false)}
        />
      )}
    </div>
  );
}
