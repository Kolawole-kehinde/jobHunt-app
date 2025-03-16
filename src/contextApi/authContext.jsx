import { createContext, useEffect, useState } from "react";
import LocalStorageService from "../utils/HandleLocalStorage";

const AuthContext = createContext({
    user: null,
    setdata: (data) => {},
});

export const AuthProvider = ({ children }) => {
    // Corrected instantiation: No need for `new`, and destructuring is removed
    const getItem = LocalStorageService.getItem; 
    const setItem = LocalStorageService.setItem;

    const getUser = getItem("auth"); // Get user data from localStorage
    const [user, setUser] = useState(getUser ? getUser : null);

    useEffect(() => {
        if (user) {
            setItem("auth", user); // Store user in localStorage
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
