import React from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" />
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h2>
          <p className="mb-6 text-gray-600">{message || "Are you sure you want to delete this job?"}</p>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition font-medium"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
