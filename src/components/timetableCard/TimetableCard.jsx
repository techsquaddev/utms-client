import React from "react";
import styles from "./timetableCard.module.css";
import Clock from "../clock/Clock";

const TimetableCard = ({ timetable }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{timetable.name}</h2>
      <Clock />
      <div className={styles.details}>
        <p>
          <strong>Year:</strong> {timetable.year}
        </p>
        <p>
          <strong>Semester:</strong> {timetable.semester}
        </p>
        <p>
          <strong>Batch:</strong> {timetable.batch}
        </p>
        <p>
          <strong>Faculty:</strong> {timetable.faculty}
        </p>
        <p>
          <strong>Specialization:</strong> {timetable.specialization}
        </p>
        <p>
          <strong>Group:</strong> {timetable.group}
        </p>
        {timetable.subGroup && (
          <p>
            <strong>SubGroup:</strong> {timetable.subGroup}
          </p>
        )}
        <p>
          <strong>Status:</strong> {timetable.status}
        </p>
      </div>
    </div>
  );
};

export default TimetableCard;
