import React, { useState } from "react";
import styles from "./addTimetable.module.css";
import { faculties, specializations } from "../../data";

const AddTimetable = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [formData, setFormData] = useState({
    year: "Y1",
    semester: "S1",
    batch: "WE",
    faculty: "FOC",
    specialization: "IT",
    group: 1,
    subGroup: 1,
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.timetableName}>
        {formData.year}.{formData.semester}.{formData.batch}.{formData.faculty}.
        {formData.specialization}.{formData.group}.{formData.subGroup}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Year:</label>
          <select
            name="year"
            value={formData.year}
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
            value={formData.semester}
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
            value={formData.batch}
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
            value={formData.faculty}
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
            value={formData.specialization}
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
            value={formData.group}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Sub Group:</label>
          <input
            type="number"
            name="subGroup"
            value={formData.subGroup}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Timetable
        </button>
      </form>
    </div>
  );
};

export default AddTimetable;
