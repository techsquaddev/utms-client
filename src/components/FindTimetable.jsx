import React, { useState } from "react";
import axios from "axios";
import { faculties, specializations } from "../data";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TimetableName } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FindTimetable = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    batch: "",
    faculty: "",
    specialization: "",
    group: "",
    subGroup: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/timetable/find-timetable",
        formData
      );
      if (response.data) {
        toast.success("Timetable Found! 🥳");

        setFormData({
          year: "",
          semester: "",
          batch: "",
          faculty: "",
          specialization: "",
          group: "",
          subGroup: "",
        });
        setSelectedFaculty("FOC");

        // Save timetable to the local storage
        localStorage.setItem("timetableId", response.data._id);

        // Redirect to the timetable page
        navigate(`/timetables/${response.data._id}`);
      } else {
        toast.info("Couldn't find the timetable! 🤷");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Error finding timetable 😕");
    }
  };

  return (
    <div>
      <TimetableName timetable={formData} />
      <div className="flex flex-col p-5 bg-white rounded-xl shadow-xl border border-border">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4 ">
                <SelectValue placeholder="Study year?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y1">Y1</SelectItem>
                <SelectItem value="Y2">Y2</SelectItem>
                <SelectItem value="Y3">Y3</SelectItem>
                <SelectItem value="Y4">Y4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base md:p-4"
            >
              <option value="" disabled selected hidden>
                Semester?
              </option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base md:p-4"
            >
              <option value="" disabled selected hidden>
                Batch - WE or WD?
              </option>
              <option value="WE">WE</option>
              <option value="WD">WD</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base md:p-4"
            >
              {faculties.map((faculty, index) => (
                <option
                  key={faculty}
                  value={index === 0 ? "" : faculty}
                  disabled={index === 0}
                  hidden={index === 0}
                >
                  {faculty}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base md:p-4"
            >
              <option value="" disabled selected hidden>
                Specialization?
              </option>
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
            <input
              type="number"
              name="group"
              placeholder="Group? (1,2,3...)"
              value={formData.group}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded md:text-base md:p-4"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="subGroup"
              placeholder="Sub group? (1,2,3...)"
              value={formData.subGroup}
              onChange={handleChange}
              className="w-full p-3 text-soft-text border text-sm border-border rounded md:text-base md:p-4"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-md hover:bg-dark-blue transition-colors duration-300"
            >
              Find My Timetable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindTimetable;
