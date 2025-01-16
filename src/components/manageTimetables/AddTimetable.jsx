import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { faculties, specializations } from "@/data";
import { TimetableName } from "..";
import { BASE_URL } from "@/api/baseURL";

const AddTimetable = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [timetable, setTimetable] = useState({
    year: "Y1",
    semester: "S1",
    batch: "WE",
    faculty: "FOC",
    specialization: "IT",
    group: 1,
    subGroup: "",
  });

  const navigate = useNavigate();

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
    try {
      const response = await axios.post(
        `${BASE_URL}/api/timetables`,
        timetable
      );
      toast.success("Timetable created successfully! 🥳");
      // Set form data after submit the timetable
      setTimetable({
        year: "Y1",
        semester: "S1",
        batch: "WE",
        faculty: "FOC",
        specialization: "IT",
        group: 1,
        subGroup: "",
      });
      setSelectedFaculty("FOC");

      // Redirect to the sessions
      navigate(`/dashboard/timetables/sessions/${response.data._id}`);
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
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
            className="w-full p-2 box-border border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white rounded-md"
        >
          Add Timetable
        </button>
      </form>
    </div>
  );
};

export default AddTimetable;
