import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { supabase } from '../../libs/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const ApplyPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Nigeria',
    city: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobId } = useParams();

  // Pre-fill email and phone from user
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('You must be logged in to apply.');
      return;
    }

    if (!jobId) {
      toast.error('Job ID is missing.');
      return;
    }

    setLoading(true);

    // Check if user already applied to this job
    const { data: existingApp } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', user.id)
      .eq('job_id', jobId)
      .single();

    if (existingApp) {
      toast.error('You can only apply once to this job.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('applications').insert([
      {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        country: form.country,
        city: form.city,
        phone_number: form.phone,
        job_id: jobId,
        user_id: user.id,
      },
    ]);

    if (error) {
      toast.error(`Failed to submit application: ${error.message}`);
    } else {
      toast.success('Application submitted successfully!');
      navigate('/resume-upload');
    }

    setLoading(false);
  };

  const isSubmitDisabled = loading || !user?.id || !jobId;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add your contact information</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex items-center justify-between">
            <span>{form.email}</span>
            <span className="text-blue-500 cursor-pointer" title="Email can’t be changed">ℹ️</span>
          </div>
        </div>

        {/* Country (static for now) */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <div className="flex items-center justify-between">
            <span>{form.country}</span>
            <span className="text-blue-600 text-sm font-medium cursor-pointer">Change</span>
          </div>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            City
          </label>
          <input
            id="city"
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <PhoneInput
            country={'ng'}
            value={form.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !px-12 !py-4 !border !rounded"
            buttonClass="!border-r"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-2 rounded transition ${
            isSubmitDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
