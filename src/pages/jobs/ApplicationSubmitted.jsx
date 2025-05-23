import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const ApplicationSubmittedPage = ({ email }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl text-center">
      {/* Illustration */}
      <div className="mb-6">
        <img
          src="/your-illustration.png" // Replace with actual image path
          alt="Application submitted"
          className="mx-auto h-32"
        />
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold mb-2">Your application has been submitted!</h2>

      {/* Email Confirmation Box */}
      <div className="border rounded-lg px-4 py-3 mt-4 mb-4 flex items-center gap-3 bg-gray-50 justify-center">
        <FaCheckCircle className="text-green-600" />
        <span className="text-sm">
          You will get an email confirmation at{" "}
          <span className="font-semibold">{email}</span>
        </span>
      </div>

      <hr className="my-4" />

      {/* MyJobs Info */}
      <h3 className="text-md font-semibold mb-1">Keep track of your applications</h3>
      <p className="text-sm text-gray-600 mb-4">
        To keep track of your applications, go to{" "}
        <a href="/myjobs" className="text-blue-600 underline">
          MyJobs
        </a>
        .
      </p>

      {/* Return to Job Search */}
      <button
        onClick={() => navigate("/jobs")}
        className="w-full py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
      >
        Return to job search
      </button>

      {/* Footer Links */}
      <p className="text-xs text-gray-500 mt-6">
        Having an issue with this application?{" "}
        <a href="/support" className="underline">
          Tell us more
        </a>
      </p>
      <p className="text-[10px] text-gray-400 mt-2">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="https://policies.google.com/terms" className="underline">
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </div>
  );
}
export default ApplicationSubmittedPage;
