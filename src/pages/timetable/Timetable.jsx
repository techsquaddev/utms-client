import React, { useEffect, useState } from "react";
import styles from "./timetable.module.css";
import { Session, Clock } from "../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sessionsData } from "../../components/session/sessionsData";
import { useParams } from "react-router-dom";
import axios from "axios";

const Timetable = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);

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
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/timetable/${timetableId}`);
        setTimetable(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchTimetable();
  }, [timetableId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDay(now.getDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!timetable) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.timetable}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{timetable.name}</h1>
        <div className={styles.info}>
          <p>
            <strong>Group:</strong> {timetable.group}
          </p>
          {timetable.subGroup && (
            <p>
              <strong>Sub Group:</strong> {timetable.subGroup}
            </p>
          )}
          <p>
            <strong>Year:</strong> {timetable.year}
          </p>
          <p>
            <strong>Semester:</strong> {timetable.semester}
          </p>
          <p>
            <strong>Batch:</strong> {timetable.batch}
          </p>
          <p>
            <strong>Faculty:</strong> {timetable.faculty}
          </p>
          <p>
            <strong>Specialization:</strong> {timetable.specialization}
          </p>
          <p>
            <strong>Status:</strong> {timetable.status}
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
