import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./updateTimetable.module.css";
import { faculties, specializations } from "../../data";
import axios from "axios";
import { toast } from "react-toastify";
import { TimetableName } from "../../components";
import { BASE_URL } from "@/api/baseURL";

const UpdateTimetable = () => {
  const { timetableId } = useParams();
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
          `${BASE_URL}/api/timetable/${timetableId}`
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
        `${BASE_URL}/api/timetable/${timetableId}`,
        timetable
      );
      toast.success("Timetable updated successfully! 🥳");
      // Handle response appropriately
    } catch (err) {
      toast.error("Something went wrong! 🤨");
    }
  };

  return (
    <div className={styles.formContainer}>
      <TimetableName timetable={timetable} />
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Year:</label>
          <select
            name="year"
            value={timetable.year}
            onChange={handleChange}
            required
          >
            <option value="Y1">Y1</option>
            <option value="Y2">Y2</option>
            <option value="Y3">Y3</option>
            <option value="Y4">Y4</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Semester:</label>
          <select
            name="semester"
            value={timetable.semester}
            onChange={handleChange}
            required
          >
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Batch:</label>
          <select
            name="batch"
            value={timetable.batch}
            onChange={handleChange}
            required
          >
            <option value="WE">WE</option>
            <option value="WD">WD</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Faculty:</label>
          <select
            name="faculty"
            value={timetable.faculty}
            onChange={handleChange}
            required
          >
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Specialization:</label>
          <select
            name="specialization"
            value={timetable.specialization}
            onChange={handleChange}
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
        <div className={styles.field}>
          <label>Group:</label>
          <input
            type="number"
            name="group"
            value={timetable.group}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Sub Group:</label>
          <input
            type="number"
            name="subGroup"
            value={timetable.subGroup}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Update Timetable
        </button>
      </form>
    </div>
  );
};

export default UpdateTimetable;
