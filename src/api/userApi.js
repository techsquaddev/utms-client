import axiosInstance from "./axiosInstance";

const USER_API = "/api/users";

// Send magic link
export const loginUser = async (email) => {
  return await axiosInstance.post(`${USER_API}/login`, { email });
};

// Register user and send verification email
export const registerUser = async (userData) => {
  return await axiosInstance.post(`${USER_API}/register`, userData);
};

// Verify email
export const verifyEmail = async (token) => {
  return await axiosInstance.post(`${USER_API}/verify-email`, { token });
};

// Login via magic link
export const verifyToken = async (token) => {
  return await axiosInstance.post(`${USER_API}/verify-token`, { token });
};

// Get user profile
export const getLoggedInUser = async () => {
  return await axiosInstance.get(`${USER_API}/me`);
};

// Logout user
export const logoutUser = async () => {
  return await axiosInstance.post(`${USER_API}/logout`);
};
