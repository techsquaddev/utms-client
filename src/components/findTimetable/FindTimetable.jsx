import React, { useState } from "react";
import styles from "./findTimetable.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindTimetable = () => {
  const [formData, setFormData] = useState({
    group: "",
    subGroup: "",
    year: "",
    semester: "",
    batch: "",
    faculty: "",
    specialization: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/timetable/find-timetable",
        formData
      );
      if (response.data.success) {
        // Redirect to the timetable page
        navigate(`/timetable/${response.data.data._id}`);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error finding timetable:", error.response.data);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Group:</label>
          <input
            type="text"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Sub Group:</label>
          <input
            type="text"
            name="subGroup"
            value={formData.subGroup}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Year:</label>
          <input
            type="text"
            value={formData.year}
            onChange={handleChange}
            name="year"
          />
        </div>
        <div className={styles.field}>
          <label>Semester:</label>
          <input
            type="text"
            value={formData.semester}
            onChange={handleChange}
            name="semester"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Batch:</label>
          <input
            type="text"
            value={formData.batch}
            onChange={handleChange}
            name="batch"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Faculty:</label>
          <input
            type="text"
            value={formData.faculty}
            onChange={handleChange}
            name="faculty"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Specialization:</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="IT">IT</option>
            <option value="SE">SE</option>
            <option value="IS">IS</option>
            <option value="CS">CS</option>
            <option value="DS">DS</option>
            <option value="CSNE">CSNE</option>
          </select>
        </div>
        <button type="submit">Find Timetable</button>
      </form>
    </div>
  );
};

export default FindTimetable;
