import axiosInstance from "./axiosInstance";

const TIMETABLE_API = "/api/timetables";
const FACULTY_API = "/api/faculties";
const SPEC_API = "/api/specializations";

// Create a timetable
export const createTimetable = async (timetableData) => {
  return await axiosInstance.post(TIMETABLE_API, timetableData);
};

// Find a timetable by specific criteria
export const findTimetable = async (criteria) => {
  return await axiosInstance.post(`${TIMETABLE_API}/find`, criteria);
};

// Get all timetables
export const getAllTimetables = async () => {
  return await axiosInstance.get(TIMETABLE_API);
};

// Get a specific timetable by ID
export const getSpecificTimetable = async (timetableId) => {
  return await axiosInstance.get(`${TIMETABLE_API}/${timetableId}`);
};

// Update a timetable by ID
export const updateTimetable = async (timetableId, updatedData) => {
  return await axiosInstance.put(
    `${TIMETABLE_API}/${timetableId}`,
    updatedData
  );
};

// Delete a timetable by ID
export const deleteTimetable = async (timetableId) => {
  return await axiosInstance.delete(`${TIMETABLE_API}/${timetableId}`);
};

// Get all faculties
export const getAllFaculties = async () => {
  return await axiosInstance.get(FACULTY_API);
};

// Get all specializations by faculty ID
export const getAllSpecsByFacultyId = async (facultyId) => {
  return await axiosInstance.get(`${SPEC_API}/${facultyId}`);
};
