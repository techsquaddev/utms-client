import axiosInstance from "./axiosInstance";

const SESSION_API = "/api/sessions";

// Create a session for a specific timetable
export const createSession = async (timetableId, sessionData) => {
  return await axiosInstance.post(`${SESSION_API}/${timetableId}`, sessionData);
};

// Get all sessions
export const getAllSessions = async () => {
  return await axiosInstance.get(SESSION_API);
};

// Get all sessions for a specific timetable by its ID
export const getAllSessionsByTimetableId = async (timetableId) => {
  return await axiosInstance.get(`${SESSION_API}/find/${timetableId}`);
};

// Get a specific session by its ID
export const getSpecificSession = async (sessionId) => {
  return await axiosInstance.get(`${SESSION_API}/${sessionId}`);
};

// Update a specific session by its ID
export const updateSession = async (sessionId, updatedData) => {
  return await axiosInstance.put(`${SESSION_API}/${sessionId}`, updatedData);
};

// Delete a specific session by its ID
export const deleteSession = async (sessionId) => {
  return await axiosInstance.delete(`${SESSION_API}/${sessionId}`);
};
