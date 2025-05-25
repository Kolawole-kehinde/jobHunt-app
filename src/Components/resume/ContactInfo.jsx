
import { FaEdit } from "react-icons/fa";

export default function ContactInfo({ editing, toggleEdit, formData, handleChange }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700">Contact information</h3>
        <button
          onClick={() => toggleEdit("contact")}
          className="text-blue-600 flex items-center text-sm"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        {/* Full Name */}
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          {editing.contact ? (
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border-b focus:outline-none"
            />
          ) : (
            <p className="font-medium">{formData.full_name}</p>
          )}
        </div>
        <hr />

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500">Email Address</p>
          <p className="font-medium">{formData.email}</p>
          <p className="text-xs text-gray-500 mt-1">
            To mitigate fraud, Indeed <i>may</i> mask your email address. If masked, the employer will see an address like...
          </p>
        </div>
        <hr />

        {/* City */}
        <div>
          <p className="text-sm text-gray-500">City</p>
          {editing.contact ? (
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border-b focus:outline-none"
            />
          ) : (
            <p className="font-medium">{formData.city}</p>
          )}
        </div>
        <hr />

        {/* Phone */}
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          {editing.contact ? (
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b focus:outline-none"
            />
          ) : (
            <p className="font-medium">{formData.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
