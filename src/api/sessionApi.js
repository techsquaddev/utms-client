import axios from "axios";
import { BASE_URL } from "./baseURL";

const API_URL = `${BASE_URL}/api/sessions`;

export const createSession = async (timetableId, session) => {
  const response = await axios.post(`${API_URL}/${timetableId}`, session);
  return response;
};

export const getAllSessions = async () => {
  const response = await axios.get(API_URL);
  return response;
};

export const getSpecificSession = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllSessionsByTimetableId = async (timetableId) => {
  const response = await axios.get(`${API_URL}/${timetableId}`);
  return response.data;
};

export const updateSession = async (id, session) => {
  const response = await axios.put(`${API_URL}/${id}`, session);
  return response.data;
};

export const deleteSession = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
