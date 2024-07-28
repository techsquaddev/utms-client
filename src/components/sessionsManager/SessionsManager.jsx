import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./sessionsManager.module.css";
import SessionCard from "../sessionCard/sessionCard";
import { getAllSessionsByTimetableId } from "@/api/sessionApi";
import { BASE_URL } from "@/api/baseURL";

const SessionsManager = ({ timetableId }) => {
  const [sessions, setSessions] = useState([]);
  const [formState, setFormState] = useState({
    day: "",
    startTime: "",
    endTime: "",
    moduleName: "",
    moduleCode: "",
    sessionType: "",
    location: "",
    coordinator: "",
    deliveryType: "",
    sessionLink: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // From sessions container
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

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsResponse = await getAllSessionsByTimetableId(timetableId);
        setSessions(sessionsResponse);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [timetableId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(`${BASE_URL}/api/sessions/${currentSessionId}`, {
          ...formState,
          time: {
            startTime: formatTime(formState.startTime),
            endTime: formatTime(formState.endTime),
          },
        });
        setSessions(
          sessions.map((session) =>
            session._id === currentSessionId
              ? {
                  ...session,
                  ...formState,
                  time: {
                    startTime: formatTime(formState.startTime),
                    endTime: formatTime(formState.endTime),
                  },
                }
              : session
          )
        );
      } else {
        const newSession = await axios.post(
          `${BASE_URL}/api/sessions/${timetableId}`,
          {
            ...formState,
            time: {
              startTime: formatTime(formState.startTime),
              endTime: formatTime(formState.endTime),
            },
          }
        );
        setSessions([...sessions, newSession.data]);
      }
      setFormState({
        day: "",
        startTime: "",
        endTime: "",
        moduleName: "",
        moduleCode: "",
        sessionType: "",
        location: "",
        coordinator: "",
        deliveryType: "",
        sessionLink: "",
      });
      setIsUpdate(false);
      setCurrentSessionId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = (session) => {
    setFormState({
      day: session.day,
      startTime: session.time.startTime,
      endTime: session.time.endTime,
      moduleName: session.moduleName,
      moduleCode: session.moduleCode,
      sessionType: session.sessionType,
      location: session.location,
      coordinator: session.coordinator,
      deliveryType: session.deliveryType,
      sessionLink: session.sessionLink,
    });
    setIsUpdate(true);
    setCurrentSessionId(session._id);
  };

  const formatTime = (time) => {
    // Assuming time is in format HH:mm
    return new Date(`1970-01-01T${time}:00`);
  };

  const handleDelete = async (session) => {
    try {
      await axios.delete(`${BASE_URL}/api/sessions/${session._id}`);
      setSessions(sessions.filter((s) => s._id !== session._id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  // From sessions container
  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{isUpdate ? "Update Session" : "Add Session"}</h2>
          <label>
            Day:
            <input
              type="text"
              name="day"
              value={formState.day}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formState.startTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formState.endTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Module Name:
            <input
              type="text"
              name="moduleName"
              value={formState.moduleName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Module Code:
            <input
              type="text"
              name="moduleCode"
              value={formState.moduleCode}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Session Type:
            <select
              name="sessionType"
              value={formState.sessionType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Lecture">Lecture</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Lecture + Tutorial">Lecture + Tutorial</option>
              <option value="Practical">Practical</option>
            </select>
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Coordinator:
            <input
              type="text"
              name="coordinator"
              value={formState.coordinator}
              onChange={handleChange}
            />
          </label>
          <label>
            Delivery Type:
            <select
              name="deliveryType"
              value={formState.deliveryType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>
          {(formState.deliveryType === "Online" ||
            formState.deliveryType === "Hybrid") && (
            <label>
              Session Link:
              <input
                type="url"
                name="sessionLink"
                value={formState.sessionLink}
                onChange={handleChange}
              />
            </label>
          )}
          <button type="submit" className={styles.submitButton}>
            {isUpdate ? "Update Session" : "Add Session"}
          </button>
        </form>
      </div>

      <div className={styles.rightWrapper}>
        {/* from sessions container */}
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
              .sort(
                (a, b) =>
                  new Date(a.time.startTime).getTime() -
                  new Date(b.time.startTime).getTime()
              )
              .map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onUpdate={() => handleUpdate(session)}
                  onDelete={() => handleDelete(session)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsManager;
