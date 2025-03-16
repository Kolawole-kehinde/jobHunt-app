import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Main Container with Profile and Job Listings Side by Side */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Profile Info</h2>
            <img
              src="/images/khenny.jpg"
              className="rounded-full size-20 mb-4"
              alt="Avatar"
            />
          </div>

          <form className="w-full max-w-lg mx-auto p-4 space-y-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Test User"
                className="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col">
              <label
                htmlFor="avatar"
                className="text-sm font-semibold text-gray-700"
              >
                Upload Avatar
              </label>
              <input
                type="file"
                id="avatar"
                className="mt-2 p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-green-400 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Job Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 text-center">
            My Job Listings
          </h2>

          {/* Job 1 */}
          <div className="pb-2">
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
              <div>
                <h3 className="font-bold">Software Engineer</h3>
                <p className="text-sm text-gray-600">Part-Time</p>
              </div>
              <div className="flex items-center gap-4 text-white ">
                <button className="bg-blue-500 px-3 py-1 rounded capitalize">
                  edit
                </button>
                <button className="bg-green-500 px-3 py-1 rounded capitalize">
                  delete
                </button>
              </div>
            </div>

            <div className="bg-gray-100 p-2 mt-4">
              <h4 className=" text-sm font-bold">Applicants</h4>
              <p className="text-sm font-bold">
                Name:{" "}
                <span className="font-normal capitalize">kolawole kehinde</span>
              </p>
              <p className="text-sm font-bold">
                Phone: <span className="font-normal"> +234 703 736 1571 </span>
              </p>
              <p className="text-sm font-bold">
                Email:{" "}
                <span className="font-normal">
                  kolawolekehinde189@gmail.com
                </span>
              </p>
              <p className="text-sm font-bold">
                Message: <span className="font-normal">khennycool</span>
              </p>
              <div className="flex flex-col items-start gap-2 mt-4">
                <button className="flex items-center gap-1 text-blue-500 text-sm">
                  <FaDownload /> Download Resume
                </button>
                <button className="flex items-center gap-1 text-red-500 text-sm">
                  <MdDelete /> Delete Applicant
                </button>
              </div>
            </div>
          </div>

          {/* Job 2 */}
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
            <div>
              <h3 className="font-bold">Marketing</h3>
              <p className="text-sm text-gray-600">Full-Time</p>
            </div>
            <div className="flex items-center gap-4 text-white ">
              <button className="bg-blue-500 px-3 py-1 rounded capitalize">
                edit
              </button>
              <button className="bg-green-500 px-3 py-1 rounded capitalize">
                delete
              </button>
            </div>
          </div>

          {/* Job 3 */}
          <div className="bg-gray-100 p-2 mt-4">
            <h4 className=" text-sm font-bold">Applicants</h4>
            <p className="text-sm py-4">No Applicants for this job</p>
          </div>

          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2 mt-2">
                 <div>
                 <h3 className="font-bold">Culpa assumenda sed</h3>
                 <p className="text-sm text-gray-600">Part-Time</p>
                 </div>
                <div className="flex items-center gap-4 text-white ">
                    <button className="bg-blue-500 px-3 py-1 rounded capitalize">edit</button>
                    <button className="bg-green-500 px-3 py-1 rounded capitalize">delete</button>
                </div>
                </div>

                <div className="bg-gray-100 p-2 mt-4">
            <h4 className=" text-sm font-bold">Applicants</h4>
            <p className="text-sm py-4">No Applicants for this job</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
