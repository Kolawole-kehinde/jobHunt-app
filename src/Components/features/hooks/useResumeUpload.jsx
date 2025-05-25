
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabase";

export function useResumeUpload() {
  const [uploading, setUploading] = useState(false);

  async function uploadFile({ file, user, jobId }) {
    if (!file || !user?.id || !jobId) {
      toast.error("Missing file, user or job.");
      return false;
    }
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fullName = `${user.first_name || ""}-${user.last_name || ""}`
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

      const fileName = `resume-${fullName}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("applications")
        .update({ resume_url: filePath })
        .eq("user_id", user.id)
        .eq("job_id", jobId);

      if (updateError) throw updateError;

      toast.success("Resume uploaded successfully!");
      return filePath;
    } catch (err) {
      console.error(err);
      toast.error(`Upload failed: ${err.message}`);
      return false;
    } finally {
      setUploading(false);
    }
  }

  return { uploading, uploadFile };
}
