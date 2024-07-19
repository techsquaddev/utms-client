/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./sessionsContainer.module.css";
import Session from "../session/Session";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SessionsContainer = ({ sessions, props }) => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const navigate = useNavigate();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  const backPage = async () => {
    const timetableId = localStorage.getItem("timetableId");
    if (timetableId) {
      localStorage.removeItem("timetableId");
    }
    navigate("/timetables/find");
  };

  console.log(sessions);

  return (
    <div>
      <div className={styles.navigation}>
        <button onClick={() => handleDayChange(-1)}>Previous</button>
        <button onClick={() => handleDayChange(1)}>Next</button>
      </div>

      <div className={styles.dayTabs}>
        {days.map((day, index) => (
          <button
            key={index}
            className={currentDay === index ? styles.activeTab : ""}
            onClick={() => setCurrentDay(index)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className={styles.sessions}>
        {sessions
          .filter((session) => session.day === days[currentDay])
          .sort((a, b) => a.time.startTime.localeCompare(b.time.startTime))
          .map((session, idx) => (
            <Session
              key={idx}
              session={session}
              currentDay={currentDay === new Date().getDay()}
            />
          ))}
      </div>
    </div>
  );
};

export default SessionsContainer;
