import React from "react";
import styles from "./manageSessions.module.css";

import AddSession from "./AddSession";

const ManageSessions = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="text-2xl">Manage Sessions of {props.name}</span>
      </div>
      <div className={styles.addSession}>
        <AddSession id={props.id} />
      </div>
    </div>
  );
};

export default ManageSessions;
