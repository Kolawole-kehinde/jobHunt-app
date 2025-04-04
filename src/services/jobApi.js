import { supabase } from "../libs/supabase";

export const jobCcreationApi = async (values) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert([values])
    .eq("users_id", values?.user_id)
    .select()
    .single();

    if(error) throw new Error(error.message);

    return data
};
