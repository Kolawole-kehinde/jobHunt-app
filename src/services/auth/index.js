import { supabase } from "../../libs/supabase";

export const signUpApi = async (payload) => { 
    const { data, error } = await supabase.auth.signUp({
        email: payload?.email,
        password: payload?.password,
    });

    if (error) throw new Error(error.message);

    if (data?.user) {
        const { data, error: userError } = await supabase
            .from("users")
            .insert([payload])
            .select()
            .single();

        if (userError) throw new Error(userError.message);
        return data;
    }
};
