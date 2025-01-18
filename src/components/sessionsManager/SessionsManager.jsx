import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../sessionCard/sessionCard";
import { BASE_URL } from "@/api/baseURL";
import { SessionForm } from "..";

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
        const sessionsResponse = await axios.get(
          `${BASE_URL}/api/sessions/find/${timetableId}`
        );
        setSessions(sessionsResponse.data);
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
    <div className="flex flex-row items-start gap-8 mt-8">
      <SessionForm
        formState={formState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isUpdate={isUpdate}
        setFormState={setFormState}
      />
      <div>
        {/* from sessions container */}
        <div>
          <div className="flex justify-between mb-5">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded transition hover:bg-blue-700"
              onClick={() => handleDayChange(-1)}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded transition hover:bg-blue-700"
              onClick={() => handleDayChange(1)}
            >
              Next
            </button>
          </div>
          <div className="flex justify-between gap-2 mb-5">
            {days.map((day, index) => (
              <button
                key={index}
                className={`${
                  currentDay === index ? "bg-blue-500 text-white" : ""
                } bg-gray-200 px-3 py-1 rounded transition hover:bg-gray-300`}
                onClick={() => setCurrentDay(index)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-5">
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
