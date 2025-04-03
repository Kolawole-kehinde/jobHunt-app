import { supabase } from "../libs/supabase";

export const jobCcreationApi = async (values) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert([values])
    .select()
    .single();

    if(error) throw new Error(error.message);

    return data
};
