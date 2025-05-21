import { FaArrowAltCircleLeft } from "react-icons/fa";

const JobHeader = ({ onBack, onEdit, onDelete, isPending, canEdit }) => (
  <div className="flex justify-between items-center mb-6">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-500 font-semibold hover:text-indigo-800 transition">
      <FaArrowAltCircleLeft size={22} /> Back
    </button>

    {canEdit && (
      <div className="flex space-x-4">
        <button onClick={onEdit} className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-indigo-700">
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={isPending}
          className={`px-5 py-2 rounded-lg text-white shadow-md transition ${
            isPending ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    )}
  </div>
);
export default JobHeader;
