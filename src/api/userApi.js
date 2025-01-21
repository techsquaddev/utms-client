import axiosInstance from "./axiosInstance";

// Send magic link
export const loginUser = async (email) => {
  return await axiosInstance.post(`/users/login`, { email });
};

// Register user and send verification email
export const registerUser = async (userData) => {
  return await axiosInstance.post(`/users/register`, userData);
};

// Verify email
export const verifyEmail = async (token) => {
  return await axiosInstance.post(`/users/verify-email`, { token });
};

// Login via magic link
export const verifyToken = async (token) => {
  return await axiosInstance.post(`/users/verify-token`, { token });
};

// Get user profile
export const getLoggedInUser = async () => {
  return await axiosInstance.get(`/users/me`);
};

// Logout user
export const logoutUser = async () => {
  return await axiosInstance.post(`/users/logout`);
};
