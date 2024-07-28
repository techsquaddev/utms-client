import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./manageSessions.module.css";
import { TimetableCard, SessionsManager } from "../../components";
import { getSpecificTimetable } from "@/api/timetableApi";

const ManageSessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableResponse = await getSpecificTimetable(timetableId);
        setTimetable(timetableResponse);
      } catch (error) {
        console.error("Error fetching timetable", error);
      }
    };
    fetchTimetable();
  }, [timetableId]);

  return (
    <div className={styles.container}>
      {timetable && <TimetableCard timetable={timetable} />}

      <SessionsManager timetableId={timetableId} />
    </div>
  );
};

export default ManageSessions;
