import React from "react";
import styles from "./reviewAndSubmit.module.css";

const ReviewAndSubmit = () => {
  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.heading}>Review Timetable</h2>
      <div className={styles.timetableDetails}>
        <p>
          <strong>Group:</strong>
        </p>
        <p>
          <strong>Sub Group:</strong>
        </p>
        <p>
          <strong>Year:</strong>
        </p>
        <p>
          <strong>Semester:</strong>
        </p>
        <p>
          <strong>Batch:</strong>
        </p>
        <p>
          <strong>Faculty:</strong>
        </p>
        <p>
          <strong>Specialization:</strong>
        </p>
        <p>
          <strong>Status:</strong>
        </p>
      </div>
      <h2 className={styles.heading}>Sessions</h2>
      <ul className={styles.sessionList}>Sessions...</ul>
      <button className={styles.submitButton}>Submit Timetable</button>
    </div>
  );
};

export default ReviewAndSubmit;
