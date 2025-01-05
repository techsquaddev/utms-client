import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logoutUser, verifyToken } from "./userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  // Token Verification
  useEffect(() => {
    const tokenVerification = async () => {
      const token = searchParams.get("token");
      if (token) {
        try {
          const response = await verifyToken(token);
          localStorage.setItem("token", response.data.token);
          setLoginMessage("Login successful!");
          navigate("/dashboard");
        } catch (error) {
          setLoginMessage("Login failed. The link may be invalid or expired.");
        }
      } else {
        setLoginMessage("Invalid login link.");
      }
    };

    tokenVerification();
  }, [searchParams, navigate]);

  // Logout User
  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("token");
  };

  // Fetch Logged In User
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await getLoggedInUser(token);
        setUser(data);
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
