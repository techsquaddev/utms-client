import React, { useEffect, useState } from "react";
import styles from "./timetable.module.css";
import { Session, Clock } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sessionsData } from "../../components/session/sessionsData";

const Timetable = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDay(now.getDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
          <Clock />
        </div>
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
          {sessionsData
            .filter((session) => session.day === days[currentDay])
            .map((session, idx) => (
              <Session
                key={idx}
                session={session}
                currentDay={currentDay === new Date().getDay()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
