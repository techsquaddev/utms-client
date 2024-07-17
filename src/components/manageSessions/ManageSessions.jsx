import React from "react";
import styles from "./manageSessions.module.css";

import AddSession from "./AddSession";

const ManageSessions = () => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="text-2xl">ManageSessions</span>
      </div>
      <div className={styles.addSession}>
        <AddSession />
      </div>
    </div>
  );
};

export default ManageSessions;
