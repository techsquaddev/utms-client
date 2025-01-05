import axios from "axios";
import { BASE_URL } from "./baseURL";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});
