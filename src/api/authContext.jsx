import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, logoutUser } from "./userApi";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Logout User
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      toast.error("Logout failed, try again! 😕");
      console.error("Logout failed:", error.message);
    }
  };

  // Fetch Logged In User
  const fetchUser = async () => {
    try {
      const { data } = await getLoggedInUser();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
