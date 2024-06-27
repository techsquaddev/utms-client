import React from "react";
import styles from "./session.module.css";

const Session = ({ session }) => {
  return (
    <div className={styles.sessionContainer}>
      <div className={styles.info}>
        <p>
          <strong>Day:</strong> {session.day}
        </p>
        <p>
          <strong>Time:</strong> {session.time.from} - {session.time.to}
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
