import React from "react";
import styles from "./timetable.module.css";
import { Session } from "../../components";

const sessionData = {
  day: "Monday",
  time: { from: "09:00", to: "10:30" },
  moduleName: "Software Engineering",
  moduleCode: "SE101",
  sessionType: "Lecture",
  coordinator: "Dr. Smith",
  location: "Room 101",
  deliveryType: "In-person",
};

const Timetable = () => {
  return (
    <div className={styles.timetable}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Y4.S1.WE.FOC.SE.1.1</h1>
        <div className={styles.info}>
          <p>
            <strong>Group:</strong> 1
          </p>
          <p>
            <strong>Sub Group:</strong> 1
          </p>
          <p>
            <strong>Year:</strong> 4
          </p>
          <p>
            <strong>Semester:</strong> 1
          </p>
          <p>
            <strong>Batch:</strong> WE
          </p>
          <p>
            <strong>Faculty:</strong> FOC
          </p>
          <p>
            <strong>Specialization:</strong> SE
          </p>
          <p>
            <strong>Status:</strong> Approved
          </p>
        </div>
        <div>
          <Session session={sessionData} />
          <Session session={sessionData} />
          <Session session={sessionData} />
          <Session session={sessionData} />
          <Session session={sessionData} />
        </div>
      </div>
    </div>
  );
};

export default Timetable;
