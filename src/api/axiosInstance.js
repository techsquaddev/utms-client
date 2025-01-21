import axios from "axios";
import { BASE_URL } from "./baseURL";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
