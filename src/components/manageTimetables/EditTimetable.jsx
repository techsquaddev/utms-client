import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/api/baseURL";
import { TimetableName } from "..";
import { faculties, specializations } from "@/data";

const EditTimetable = ({ timetableId }) => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [timetable, setTimetable] = useState({
    year: "",
    semester: "",
    batch: "",
    faculty: "",
    specialization: "",
    group: "",
    subGroup: "",
  });
  const [initialTimetable, setInitialTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/timetables/${timetableId}`
        );
        setTimetable(response.data);
        setInitialTimetable(response.data);
        setSelectedFaculty(response.data.faculty);
      } catch (err) {
        toast.error("Failed to fetch timetable data! 😟");
      }
    };

    fetchTimetable();
  }, [timetableId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTimetable({
      ...timetable,
      [name]: value,
    });

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(timetable) === JSON.stringify(initialTimetable)) {
      toast.warn("No changes made to update the timetable.");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/timetables/${timetableId}`,
        timetable
      );
      toast.success("Timetable updated successfully! 🥳");
    } catch (err) {
      toast.error("Something went wrong! 🤨");
    }
  };

  return (
    <div className="flex flex-col">
      <TimetableName timetable={timetable} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Year:</label>
          <select
            name="year"
            value={timetable.year}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          >
            <option value="Y1">Y1</option>
            <option value="Y2">Y2</option>
            <option value="Y3">Y3</option>
            <option value="Y4">Y4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Semester:</label>
          <select
            name="semester"
            value={timetable.semester}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          >
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Batch:</label>
          <select
            name="batch"
            value={timetable.batch}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          >
            <option value="WE">WE</option>
            <option value="WD">WD</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Faculty:</label>
          <select
            name="faculty"
            value={timetable.faculty}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          >
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Specialization:</label>
          <select
            name="specialization"
            value={timetable.specialization}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          >
            {specializations[selectedFaculty] ? (
              specializations[selectedFaculty].map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No specializations available
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Group:</label>
          <input
            type="number"
            name="group"
            value={timetable.group}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sub Group:</label>
          <input
            type="number"
            name="subGroup"
            value={timetable.subGroup}
            onChange={handleChange}
            className="w-full px-2 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="px-6 py-2 bg-primary rounded">
          Update Timetable
        </button>
      </form>
    </div>
  );
};

export default EditTimetable;
