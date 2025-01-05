import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const token = searchParams.get("token");
      if (token) {
        try {
          const response = await loginWithToken(token);
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

    login();
  }, [searchParams, navigate]);

  const logout = async () => {
    await api.post("/members/logout");
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await api.get("/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Mark loading as complete
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Render children only when loading is complete
  if (loading) {
    return <div>Loading...</div>; // Optional: Replace with a loader
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
