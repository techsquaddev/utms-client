import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./manageSessions.module.css";
import { TimetableCard, SessionCard } from "../../components";

const ManageSessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
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

  useEffect(() => {
    const fetchTimetableAndSessions = async () => {
      try {
        const timetableResponse = await axios.get(
          `/api/timetable/${timetableId}`
        );
        setTimetable(timetableResponse.data);
        const sessionsResponse = await axios.get(`/api/session/${timetableId}`);
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching timetable and sessions:", error);
      }
    };
    fetchTimetableAndSessions();
  }, [timetableId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(`/api/session/${currentSessionId}`, {
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
        const newSession = await axios.post(`/api/session/${timetableId}`, {
          ...formState,
          time: {
            startTime: formatTime(formState.startTime),
            endTime: formatTime(formState.endTime),
          },
        });
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
      await axios.delete(`/api/session/${session._id}`);
      setSessions(sessions.filter((s) => s._id !== session._id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className={styles.container}>
      {timetable && <TimetableCard timetable={timetable} />}
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
      <div className={styles.sessionCards}>
        {sessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            onUpdate={() => handleUpdate(session)}
            onDelete={() => handleDelete(session)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageSessions;
