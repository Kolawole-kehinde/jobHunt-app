
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../libs/supabase';

export const useApplyForm = () => {
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

      if (error) throw new Error(error.message);

      navigate(`/resume-upload/${jobId}`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isSubmitDisabled: loading || !form.firstName || !form.lastName || !form.city,
  };
};
