import React from "react";
import styles from "./reviewAndSubmit.module.css";
import axios from "axios";

const ReviewAndSubmit = () => {
  const handleSubmit = async () => {
    try {
      await axios.put(`/api/timetable/${timetable.id}`, timetable);
      console.log("Timetable submitted successfully!");
    } catch (error) {
      console.error("Error submitting timetable:", error);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.heading}>Review Timetable</h2>
      <pre className={styles.preformatted}>
        {JSON.stringify(timetable, null, 2)}
      </pre>
      <div className={styles.navigation}>
        <button onClick={prevStep} className={styles.navButton}>
          Previous
        </button>
        <button onClick={handleSubmit} className={styles.navButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
