import React from "react";
import styles from "./timetableName.module.css";

const TimetableName = ({ timetable }) => {
  return (
    <div className={styles.timetableName}>
      <span className={styles.box}>{timetable.year}</span>.
      <span className={styles.box}>{timetable.semester}</span>.
      <span className={styles.box}>{timetable.batch}</span>.
      <span className={styles.box}>{timetable.faculty}</span>.
      <span className={styles.box}>{timetable.specialization}</span>.
      <span className={styles.box}>{timetable.group}</span>
      {timetable.subGroup && (
        <>
          .<span className={styles.box}>{timetable.subGroup}</span>
        </>
      )}
    </div>
  );
};

export default TimetableName;
