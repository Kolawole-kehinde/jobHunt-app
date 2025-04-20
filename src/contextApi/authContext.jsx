import { createContext, useEffect, useState } from "react";
import LocalStorageService from "../utils/HandleLocalStorage";
import { useNavigate } from "react-router";
import { supabase } from "../libs/supabase";
import toast from "react-hot-toast";

// Create AuthContext
const AuthContext = createContext({
  user: null,
  setUser: () => {},
  handleLogout: () => {},
  updatePassword: async () => {},
  updateProfile: async () => {}, 
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { getItem, setItem, clear } = LocalStorageService;
  const getUser = getItem("auth");
  const [user, setUser] = useState(getUser || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setItem("auth", user);
    }
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      clear();
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update password");
      throw error;
    } finally {
      setLoading(false);
    }
  };


const updateProfile = async (profileData) => {
  setLoading(true);
  try {
    if (!user?.id) throw new Error("User not found");

    const { data, error } = await supabase
      .from("users")
      .update({
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        profilePicture: profileData.profilePicture,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    setUser(data); // update local state
    setItem("auth", data); // update localStorage
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error(error.message || "Failed to update profile");
    throw error;
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        updatePassword,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
