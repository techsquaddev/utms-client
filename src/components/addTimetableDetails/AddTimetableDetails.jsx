import React from "react";
import styles from "./addTimetableDetails.module.css";

const AddTimetableDetails = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.field}>
        <label>Group:</label>
        <input type="text" name="group" required />
      </div>
      <div className={styles.field}>
        <label>Sub Group:</label>
        <input type="text" name="subGroup" required />
      </div>
      <div className={styles.field}>
        <label>Year:</label>
        <input type="text" name="year" />
      </div>
      <div className={styles.field}>
        <label>Semester:</label>
        <input type="text" name="semester" required />
      </div>
      <div className={styles.field}>
        <label>Batch:</label>
        <input type="text" name="batch" required />
      </div>
      <div className={styles.field}>
        <label>Faculty:</label>
        <input type="text" name="faculty" required />
      </div>
      <div className={styles.field}>
        <label>Specialization:</label>
        <select name="specialization" required>
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
        <select name="status" required>
          <option value="Pending">Pending</option>
          <option value="Updated">Updated</option>
          <option value="Approved">Approved</option>
        </select>
      </div>
    </div>
  );
};

export default AddTimetableDetails;
