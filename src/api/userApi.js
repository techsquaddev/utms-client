import axios from "axios";
import { BASE_URL } from "./baseURL";

const API_URL = `${BASE_URL}/api/users`;

// Send magic link
export const loginUser = async (email) => {
  return await axios.post(`${API_URL}/login`, { email });
};

// Register user and send verification email
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Verify email
export const verifyEmail = async (token) => {
  return await axios.post(`${API_URL}/verify-email`, { token });
};

// Login via magic link
export const verifyToken = async (token) => {
  return await axios.post(`${API_URL}/verify-token`, { token });
};

// Get user profile
export const getUserProfile = async (token) => {
  return await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Logout user
export const logoutUser = async () => {
  return await axios.post(`${API_URL}/logout`);
};
