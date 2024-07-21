import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "./SessionCard";
import styles from "./sessionViewer.module.css";

import { Button } from "../ui/button";

const SessionViewer = (props) => {
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
        const sessionsResponse = await axios.get(
          `/api/session/getall/${props.id}`
        );
        setSessions(sessionsResponse.data);
        console.log(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [props.id]);

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
        const newSession = await axios.post(`/api/session/${props.id}`, {
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

  // From sessions container
  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  return (
    <div className="mt-5">
      {" "}
      <div className="">
        {/* from sessions container */}
        <div>
          <div className="justify-between flex">
            <Button
              className="rounded-full w-24 bg-[#333333]"
              onClick={() => handleDayChange(-1)}
            >
              Previous
            </Button>
            <Button
              className="rounded-full w-24 bg-[#333333]"
              onClick={() => handleDayChange(1)}
            >
              Next
            </Button>
          </div>
          <div className="mt-5 bg-[#333333] justify-between flex">
            {days.map((day, index) => (
              <Button
                key={index}
                className={`w-full bg-[#333333] rounded-none  hover:bg-[#6da7e6] ${
                  currentDay === index ? " bg-[#007bff]" : ""
                }`}
                onClick={() => setCurrentDay(index)}
              >
                {day}
              </Button>
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

export default SessionViewer;
