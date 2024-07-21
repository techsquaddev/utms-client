import React, { useEffect, useState } from "react";
import styles from "./manageSessions.module.css";
import axios from "axios";

import AddSession from "./AddSession";
import TimetableCardL from "./TimetableCardL";
import SessionViewer from "./SessionViewer";

const ManageSessions = (props) => {
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const fetchTimetableAndSessions = async () => {
      try {
        const timetableResponse = await axios.get(`/api/timetable/${props.id}`);
        setTimetable(timetableResponse.data);
        const sessionsResponse = await axios.get(`/api/session`);
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching timetable and sessions:", error);
      }
    };
    fetchTimetableAndSessions();
  }, [props.id]);

  const formatTime = (time) => {
    // Assuming time is in format HH:mm
    return new Date(`1970-01-01T${time}:00`);
  };

  return (
    <div className={`overflow-y-auto scrollbar h-full ${styles.body}`}>
      <div className="w-full">
        {timetable && <TimetableCardL timetable={timetable} />}
      </div>
      <div className={styles.addSession}>
        <AddSession id={props.id} />
      </div>
      <div className="w-full">
        <SessionViewer id={props.id} />
      </div>
    </div>
  );
};

export default ManageSessions;
