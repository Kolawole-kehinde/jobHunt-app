import { supabase } from "../libs/supabase";


export const updateJobApi = async (jobData) => {
  const { id, ...updateFields } = jobData;

  const { data, error } = await supabase
    .from("jobs")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};



export const jobCcreationApi = async (jobData) => {
  const { data, error } = await supabase.from("jobs").insert([jobData]).select().single();

  if (error) throw new Error(error.message);

  return data;
};

