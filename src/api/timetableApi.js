import axios from "axios";

const API_URL = "/api/timetable";

export const createTimeTable = async (timetable) => {
  const response = await axios.post(API_URL, timetable);
  return response.data;
};

export const getAllTimeTables = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSpecificTimeTable = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const findTimeTable = async (details) => {
  const response = await axios.post(`${API_URL}/find-timetable`, details);
  return response.data;
};

export const updateTimeTable = async (id, timetable) => {
  const response = await axios.put(`${API_URL}/${id}`, timetable);
  return response.data;
};

export const deleteTimeTable = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
