import axios from "axios";
import { BASE_URL } from "./baseURL";

const API_URL = `${BASE_URL}/api/users`;

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
};
