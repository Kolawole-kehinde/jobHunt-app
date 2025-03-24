import { supabase } from "../../libs/supabase";
import bcrypt from 'bcryptjs'; // Correct bcryptjs import

export const signUpApi = async (payload) => { 
    const hashPassword = async (password) => {
        const saltRounds = 10;  // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);  
        return hashedPassword;
    };
       
    const { data, error } = await supabase.auth.signUp({
        email: payload?.email,
        password: payload?.password,
    });

    if (error) throw new Error(error.message);

    if (data?.user) {
        const hashedPassword = await hashPassword(payload.password);   
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert([{ ...payload, password: hashedPassword }])  // Corrected the object spread issue
            .select()
            .single();

        if (userError) throw new Error(userError.message);
        return userData;  // Return user data after inserting it
    }
};
