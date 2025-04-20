import { supabase } from "../../libs/supabase";

export const signUpApi = async (payload) => {
  const {
    email,
    password,
    fullName,
    phoneNumber,
    profilePicture = "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName), // 👈 default image
  } = payload;

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = data?.user;
  if (!user || !user.id) throw new Error("User creation failed.");

  // 2. Insert additional info into `users` table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        user_id: user.id,      // foreign key
        fullName,
        email,
        phoneNumber,
        profilePicture,        // default if none provided
      },
    ])
    .select()
    .single();

  if (userError) throw new Error(userError.message);

  return userData;
};



export const SignInApi = async (payload) => {
    const { email, password } = payload;
  
    // Let Supabase handle authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) throw new Error(error.message);
  
    if (data?.user) {
      // Fetch user data from your custom users table using `id`
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select()
        .eq("user_id", data.user.id)  // using id to fetch user, assuming it's unique
        .single();  // Ensure only one row is returned
  
      if (userError) throw new Error(userError.message);
  
      // Debug: log the result to check the returned data
      console.log('User Data:', userData);  // Check how many rows are being returned
  
      return userData;
    }
  };
  
  