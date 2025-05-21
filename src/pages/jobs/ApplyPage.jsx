import React, { useState } from "react";

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact info submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress & Header */}
        <div className="mb-6">
          <button className="text-blue-700 font-medium mb-2">Save and close</button>
          <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
            <div className="h-full bg-blue-700 rounded-full w-1/5"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add your contact information</h2>
          <p className="text-gray-600 mt-1">We'll save any changes to your profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-md shadow-sm space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">First name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Last name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Email + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <p className="text-gray-800">kolawoledhikurullah93@gmail.com</p>
            </div>
            <div className="flex justify-end">
              <button type="button" className="text-blue-700 font-medium">Change</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Country</label>
            <p className="text-gray-800">Nigeria</p>
          </div>

          {/* City + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phone number</label>
              <div className="flex items-center">
                <div className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-white">
                  <span role="img" aria-label="Nigeria flag">🇳🇬</span>
                  <span className="ml-2">+234</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-l-0 px-4 py-2 rounded-r-md focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
