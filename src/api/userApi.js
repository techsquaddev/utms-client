import axios from "axios";
import { BASE_URL } from "./baseURL";

const API_URL = `${BASE_URL}/api/users`;

// Send magic link
export const loginUser = async (email) => {
  return await axios.post(
    `${API_URL}/login`,
    { email },
    {
      withCredentials: true,
    }
  );
};

// Register user and send verification email
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Verify email
export const verifyEmail = async (token) => {
  return await axios.post(
    `${API_URL}/verify-email`,
    { token },
    {
      withCredentials: true,
    }
  );
};

// Login via magic link
export const verifyToken = async (token) => {
  return await axios.post(
    `${API_URL}/verify-token`,
    { token },
    {
      withCredentials: true,
    }
  );
};

// Get user profile
export const getLoggedInUser = async (token) => {
  return await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
};

// Logout user
export const logoutUser = async () => {
  return await axios.post(`${API_URL}/logout`);
};
