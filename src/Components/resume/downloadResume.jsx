
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabase";

export const downloadResume = async (resumeUrl) => {
  try {
    // Extract path inside storage bucket
    const path = resumeUrl.includes("resumes/") ? resumeUrl.split("resumes/")[1] : resumeUrl;

    // Get a signed URL valid for 60 seconds
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(`resumes/${path}`, 60);
    if (error) throw error;

    window.open(data.signedUrl, "_blank");
  } catch (error) {
    toast.error("Failed to download resume");
    console.error(error);
  }
};
