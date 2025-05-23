import { useEffect, useState } from "react";
import { supabase } from "../../../libs/supabase";

const useApplications = (userId) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchApplications = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id, created_at, resume_url, job_id,
          jobs ( title, company, state )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message || "Failed to fetch applications");
        setApplications([]);
      } else {
        setApplications(data);
        setError(null);
      }

      setLoading(false);
    };

    fetchApplications();
  }, [userId]);

  return { applications, loading, error };
};

export default useApplications;
