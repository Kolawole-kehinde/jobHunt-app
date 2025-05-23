import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../libs/supabase";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ResumeReviewPage() {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [editing, setEditing] = useState({});
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .single();

      if (error) {
        toast.error("Failed to load application");
        return;
      }

      setApplication(data);
      setFormData({
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        city: data.city,
        phone: data.phone_number,
        resume_filename: data.resume_filename,
      });
    };

    if (user && jobId) fetchData();
  }, [user, jobId]);

  const toggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    const [first_name, ...last] = formData.full_name.trim().split(" ");
    const updates = {
      first_name,
      last_name: last.join(" "),
      city: formData.city,
      phone_number: formData.phone,
    };

    const { error } = await supabase
      .from("applications")
      .update(updates)
      .eq("user_id", user.id)
      .eq("job_id", jobId);

    if (error) {
      toast.error("Failed to save changes");
    } else {
      toast.success("Saved successfully");
      setEditing({});
    }

    setSaving(false);
  };
    const handleSubmit = () => {
      toast.success("Application submitted!");
      navigate("/submitted", { state: { email: application.email } });
    };

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

      {/* Contact Info */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">Contact information</h3>
          <button onClick={() => toggleEdit("contact")} className="text-blue-600 flex items-center text-sm">
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

      {/* Resume Section */}
      {/* <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">CV</h3>
          <button onClick={() => toggleEdit("cv")} className="text-blue-600 flex items-center text-sm">
            <FaEdit className="mr-1" /> Edit
          </button>
        </div>

        <div className="border p-4 rounded-lg flex items-center gap-3 bg-gray-50">
          <div className="bg-blue-100 p-2 rounded">
            <span className="text-blue-600 font-bold text-xs">PDF</span>
          </div>
          <p className="text-sm font-medium text-gray-800">{formData.resume_url}</p>
        </div>
      </div> */}

      {/* Submit Application */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full py-3 rounded-xl text-center font-semibold mt-4 hover:bg-blue-700"
      >
        Submit your application
      </button>
    </div>
  );
}
