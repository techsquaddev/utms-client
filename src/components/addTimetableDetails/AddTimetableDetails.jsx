import React from "react";
import styles from "./addTimetableDetails.module.css";
import axios from "axios";

const AddTimetableDetails = ({ timetable, setTimetable, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimetable((prevTimetable) => ({
      ...prevTimetable,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/timetable", timetable);
      setTimetable(response.data);
      nextStep();
    } catch (error) {
      console.error("Error creating timetable:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.field}>
        <label>Group:</label>
        <input
          type="text"
          name="group"
          value={timetable.group}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Sub Group:</label>
        <input
          type="text"
          name="subGroup"
          value={timetable.subGroup}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={timetable.year}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label>Semester:</label>
        <input
          type="text"
          name="semester"
          value={timetable.semester}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Batch:</label>
        <input
          type="text"
          name="batch"
          value={timetable.batch}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Faculty:</label>
        <input
          type="text"
          name="faculty"
          value={timetable.faculty}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Specialization:</label>
        <select
          name="specialization"
          value={timetable.specialization}
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
      <div className={styles.field}>
        <label>Status:</label>
        <select
          name="status"
          value={timetable.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Updated">Updated</option>
          <option value="Approved">Approved</option>
        </select>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Next
      </button>
    </div>
  );
};

export default AddTimetableDetails;
