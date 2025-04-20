import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router';


const PasswordSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <FiCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Password Reset Successful</h2>
        <p className="text-gray-600 mb-6">
          Your password has been updated successfully. You can now log in with your new credentials.
        </p>
        <Link
          to="/auth/login"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordSuccessPage;




