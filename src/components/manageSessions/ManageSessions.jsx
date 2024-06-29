import React, { useEffect, useState } from "react";
import styles from "./manageSessions.module.css";
import axios from "axios";

const ManageSessions = ({ timetable, setTimetable, nextStep, prevStep }) => {
  const [session, setSession] = useState({
    day: "",
    from: "",
    to: "",
    moduleName: "",
    moduleCode: "",
    sessionType: "",
    coordinator: "",
    location: "",
    deliveryType: "",
  });

  console.log(timetable);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/session/${timetable.data._id}`);
        setTimetable((prevTimetable) => ({
          ...prevTimetable,
          sessions: response.data,
        }));
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [timetable.data._id, setTimetable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession((prevSession) => ({
      ...prevSession,
      [name]: value,
    }));
  };

  const addOrUpdateSession = async () => {
    try {
      const response = await axios.post(
        `/api/session/${timetable.data._id}`,
        session
      );
      setTimetable((prevTimetable) => ({
        ...prevTimetable,
        sessions: [...prevTimetable.data.sessions, response.data],
      }));
      setSession({
        day: "",
        from: "",
        to: "",
        moduleName: "",
        moduleCode: "",
        sessionType: "",
        coordinator: "",
        location: "",
        deliveryType: "",
      });
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`/api/session/${sessionId}`);
      setTimetable((prevTimetable) => ({
        ...prevTimetable,
        sessions: prevTimetable.sessions.filter(
          (session) => session.id !== sessionId
        ),
      }));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className={styles.manageSessionsContainer}>
      <h2 className={styles.heading}>Add/Edit Session</h2>
      <div className={styles.field}>
        <label>Day:</label>
        <input
          type="text"
          name="day"
          value={session.day}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Time From:</label>
        <input
          type="time"
          name="from"
          value={session.from}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Time To:</label>
        <input
          type="time"
          name="to"
          value={session.to}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Module Name:</label>
        <input
          type="text"
          name="moduleName"
          value={session.moduleName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Module Code:</label>
        <input
          type="text"
          name="moduleCode"
          value={session.moduleCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Session Type:</label>
        <input
          type="text"
          name="sessionType"
          value={session.sessionType}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Coordinator:</label>
        <input
          type="text"
          name="coordinator"
          value={session.coordinator}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={session.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Delivery Type:</label>
        <input
          type="text"
          name="deliveryType"
          value={session.deliveryType}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="button"
        onClick={addOrUpdateSession}
        className={styles.addButton}
      >
        Add/ Update Session
      </button>

      <h2 className={styles.heading}>Sessions</h2>
      {timetable.data.sessions ? (
        <ul className={styles.sessionList}>
          {timetable.data.sessions.map((session, index) => (
            <li className={styles.sessionItem} key={index}>
              <span>{session.data.moduleName}</span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteSession(session.data._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      <div className={styles.navigation}>
        <button onClick={prevStep} className={styles.navButton}>
          Previous
        </button>
        <button onClick={nextStep} className={styles.navButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageSessions;
