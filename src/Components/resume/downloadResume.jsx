import toast from "react-hot-toast";
import { supabase } from "../../libs/supabase";

export const downloadResume = async (resumeUrl) => {
  try {
    // Extract path inside storage bucket
    const path = resumeUrl.includes("resumes/") ? resumeUrl.split("resumes/")[1] : resumeUrl;

    // Get a signed URL valid for 60 seconds
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(`resumes/${path}`, 60);
    if (error) throw error;

    // Create a hidden anchor element and trigger download
    const link = document.createElement("a");
    link.href = data.signedUrl;
    // Set the download attribute to suggest a filename
    link.download = path.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    toast.error("Failed to download resume");
    console.error(error);
  }
};
