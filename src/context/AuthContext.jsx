import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "/api/users/auth",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await axios.post("/api/users/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
