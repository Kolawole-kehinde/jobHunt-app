
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";

export function useReviewApplication(userId, jobId) {
  const [application, setApplication] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId || !jobId) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId)
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

    fetchData();
  }, [userId, jobId]);

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
      .eq("user_id", userId)
      .eq("job_id", jobId);

    if (error) {
      toast.error("Failed to save changes");
    } else {
      toast.success("Saved successfully");
      setEditing({});
    }

    setSaving(false);
  };

  return {
    application,
    formData,
    editing,
    saving,
    toggleEdit,
    handleChange,
    handleSave,
  };
}
