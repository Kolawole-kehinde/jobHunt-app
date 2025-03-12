const Dashboard = () => {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Container with equal-width Profile and Job Listings */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Profile Info */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
             <div className="flex flex-col items-center justify-center">
             <h2 className="text-lg font-semibold mb-4">Profile Info</h2>
             <img src="/images/profile.jpg" className="rounded-full size-20 mb-4" alt="Avatar" />
             </div>
             <form className="w-full max-w-lg mx-auto p-4 space-y-6">
      {/* Name Field */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Test User"
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* File Upload */}
      <div className="flex flex-col">
        <label htmlFor="avatar" className="text-sm font-semibold text-gray-700">
          Upload Avatar
        </label>
        <input
          type="file"
          id="avatar"
          className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Save
        </button>
      </div>
    </form>
          </div>
  
          {/* Job Listings */}
         
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  