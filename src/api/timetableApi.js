import axios from "axios";
import { BASE_URL } from "./baseURL";

const API_URL = `${BASE_URL}/api/timetables`;

export const createTimetable = async (timetable) => {
  const response = await axios.post(API_URL, timetable);
  return response.data;
};

export const getAllTimetables = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSpecificTimetable = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getSpecificTimetableByName = async (name) => {
  const response = await axios.get(`${API_URL}/${name}`);
  return response.data;
};

export const findTimetable = async (details) => {
  const response = await axios.post(`${API_URL}/find`, details);
  return response.data;
};

export const updateTimetable = async (id, timetable) => {
  const response = await axios.put(`${API_URL}/${id}`, timetable);
  return response.data;
};

export const deleteTimetable = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
