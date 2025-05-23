import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const ApplicationSubmittedModal = ({ email, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-lg w-full mx-4 p-6 shadow-2xl relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Green Check Icon */}
        <div className="flex justify-center items-center mb-4">
          <div className="bg-green-100 rounded-full p-4">
            <FaCheckCircle className="text-green-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-gray-800">
          Your application has been submitted!
        </h2>

        {/* Email Confirmation */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-4 mb-5 justify-center">
          <FaCheckCircle className="text-green-600" />
          <span className="text-sm text-gray-700">
            You will get an email confirmation at{" "}
            <span className="font-semibold">{email}</span>
          </span>
        </div>

        {/* Info & Link */}
        <div className="text-center text-sm text-gray-600 mb-6">
          To keep track of your applications, visit{" "}
          <button
            onClick={() => navigate("/my-jobs")}
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
          >
            MyJobs
          </button>
          .
        </div>

        {/* Return to Job Search */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Return to Job Search
        </button>
      </div>
    </div>
  );
};

export default ApplicationSubmittedModal;
