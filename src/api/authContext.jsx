import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, logoutUser } from "./userApi";

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

  // Render children only when loading is complete
  if (loading) {
    return <div>Loading...</div>; // Replace with a loader
  }

  return (
    <AuthContext.Provider value={{ user, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
