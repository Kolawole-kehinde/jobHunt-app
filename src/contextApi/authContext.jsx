import { createContext, useEffect, useState } from "react";
import LocalStorageService from "../utils/HandleLocalStorage";
import { useNavigate } from "react-router";

const AuthContext = createContext({
  user: null,
  setdata: (data) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const { getItem, setItem, clear } = LocalStorageService;
  const getUser = getItem("auth");
  const [user, setUser] = useState(getUser ? getUser : null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setItem("auth", user);
    }
  }, [user, setItem]);

  const handleLogout = () => {
    setUser(null);
    clear();
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{
         user, 
         setUser,
         handleLogout,}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
