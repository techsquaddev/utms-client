import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, logoutUser } from "./userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Logout User
  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("token");
  };

  // Fetch Logged In User
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token: " + token);
    if (token) {
      try {
        const { data } = await getLoggedInUser(token);
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Render children only when loading is complete
  if (loading) {
    return <div>Loading...</div>; // Optional: Replace with a loader
  }

  return (
    <AuthContext.Provider value={{ user, loginMessage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
