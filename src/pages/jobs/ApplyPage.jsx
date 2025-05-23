import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { supabase } from '../../libs/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { InputField } from '../../Components/applyJobInputs';

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

  // Prefill from user
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = value => {
    // Add space after country code (e.g., +234 7037361571)
    const formatted = value.replace(/(\+\d{1,4})(\d+)/, '$1 $2');
    setForm(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user?.id || !jobId) {
      toast.error('Missing user or job information.');
      return;
    }

    setLoading(true);

    try {
      const { data: existingApp } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();

      if (existingApp) {
        toast.error('You can only apply once to this job.');
        return;
      }

      const { error } = await supabase.from('applications').insert([{
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        country: form.country,
        city: form.city,
        phone_number: form.phone,
        job_id: jobId,
        user_id: user.id,
      }]);

      if (error) {
        throw new Error(error.message);
      }
      navigate(`/resume-upload/${jobId}`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !form.firstName || !form.lastName || !form.city;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Add your contact information</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <InputField
          id="firstName"
          name="firstName"
          label="First name"
          value={form.firstName}
          onChange={handleChange}
        />

        {/* Last Name */}
        <InputField
          id="lastName"
          name="lastName"
          label="Last name"
          value={form.lastName}
          onChange={handleChange}
        />

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex justify-between items-center">
            <span>{form.email}</span>
            <span title="Email can’t be changed" className="text-blue-500 cursor-pointer">ℹ️</span>
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <div className="flex justify-between items-center">
            <span>{form.country}</span>
            <span className="text-blue-600 text-sm font-medium cursor-pointer">Change</span>
          </div>
        </div>

        {/* City */}
        <InputField
          id="city"
          name="city"
          label="City"
          value={form.city}
          onChange={handleChange}
        />

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <PhoneInput
            country="ng"
            value={form.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !pl-14 !py-2 !border !rounded-2xl !border-2 !py-7"
            buttonClass="!border-r"
            inputStyle={{ borderRadius: '1rem' }}
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


