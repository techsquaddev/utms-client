import React from "react";
import styles from "./manageSessions.module.css";

const ManageSessions = () => {
  return (
    <div className={styles.manageSessionsContainer}>
      <h2 className={styles.heading}>Add/Edit Session</h2>
      <div className={styles.field}>
        <label>Day:</label>
        <input type="text" name="day" required />
      </div>
      <div className={styles.field}>
        <label>Time From:</label>
        <input type="time" name="from" required />
      </div>
      <div className={styles.field}>
        <label>Time To:</label>
        <input type="time" name="to" required />
      </div>
      <div className={styles.field}>
        <label>Module Name:</label>
        <input type="text" name="moduleName" required />
      </div>
      <div className={styles.field}>
        <label>Module Code:</label>
        <input type="text" name="moduleCode" required />
      </div>
      <div className={styles.field}>
        <label>Session Type:</label>
        <input type="text" name="sessionType" required />
      </div>
      <div className={styles.field}>
        <label>Coordinator:</label>
        <input type="text" name="coordinator" required />
      </div>
      <div className={styles.field}>
        <label>Location:</label>
        <input type="text" name="location" required />
      </div>
      <div className={styles.field}>
        <label>Delivery Type:</label>
        <input type="text" name="deliveryType" required />
      </div>
      <button type="button" className={styles.addButton}>
        Add/ Update Session
      </button>

      <h2 className={styles.heading}>Sessions</h2>
      <ul className={styles.sessionList}>
        <li className={styles.sessionItem}>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton}>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default ManageSessions;
