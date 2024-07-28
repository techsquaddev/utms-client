import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./manageSessions.module.css";
import { TimetableCard, SessionsManager } from "../../components";
import { BASE_URL } from "@/api/baseURL";
import axios from "axios";

const ManageSessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableResponse = await axios.get(
          `${BASE_URL}/api/timetables/${timetableId}`
        );
        setTimetable(timetableResponse.data);
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
