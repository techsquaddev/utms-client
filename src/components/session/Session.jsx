/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./session.module.css";

const Session = ({ session, currentDay }) => {
  const now = new Date();
  const sessionTime = new Date();
  sessionTime.setHours(session.time.startTime.split(":")[0]);
  sessionTime.setMinutes(session.time.startTime.split(":")[1]);

  const isCurrentSession =
    currentDay &&
    now >= sessionTime &&
    now <= sessionTime.setMinutes(sessionTime.getMinutes() + 90);

  return (
    <div
      className={`shadow-md bg-white ${styles.sessionContainer} ${
        isCurrentSession ? styles.currentSession : ""
      }`}
    >
      <div className={styles.info}>
        <p>
          <strong>Day:</strong> {session.day}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {new Date(session.time.startTime).toLocaleTimeString()} -{" "}
          {new Date(session.time.endTime).toLocaleTimeString()}
        </p>
        <p>
          <strong>Module Name:</strong> {session.moduleName}
        </p>
        <p>
          <strong>Module Code:</strong> {session.moduleCode}
        </p>
        <p>
          <strong>Session Type:</strong> {session.sessionType}
        </p>
        <p>
          <strong>Coordinator:</strong> {session.coordinator}
        </p>
        <p>
          <strong>Location:</strong> {session.location}
        </p>
        <p>
          <strong>Delivery Type:</strong> {session.deliveryType}
        </p>
      </div>
    </div>
  );
};

export default Session;
