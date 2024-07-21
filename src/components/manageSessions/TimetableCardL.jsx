import React from "react";
import styles from "./timetableCardL.module.css";
import Clock from "../clock/Clock";
import { Link } from "react-router-dom";

const TimetableCardL = ({ timetable }) => {
  return (
    <div className={styles.card}>
      <div className="w-full justify-center flex">
        <h2 className={styles.title}>Manage Sessions of {timetable.name}</h2>
      </div>
      <div>
        <Clock />
        <div className="flex justify-between mx-24 mt-10">
          <div className={styles.details}>
            <p>
              <strong>Year:</strong> {timetable.year}
            </p>
            <p>
              <strong>Semester:</strong> {timetable.semester}
            </p>
          </div>
          <div>
            <p>
              <strong>Batch:</strong> {timetable.batch}
            </p>
            <p>
              <strong>Faculty:</strong> {timetable.faculty}
            </p>
          </div>
          <div>
            <p>
              <strong>Specialization:</strong> {timetable.specialization}
            </p>
            <p>
              <strong>Group:</strong> {timetable.group}
            </p>
          </div>
          <div className={styles.details}>
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
      </div>
    </div>
  );
};

export default TimetableCardL;
