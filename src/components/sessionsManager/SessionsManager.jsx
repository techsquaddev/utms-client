import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../sessionCard/sessionCard";
import { BASE_URL } from "@/api/baseURL";

const SessionsManager = ({ timetableId }) => {
  const [sessions, setSessions] = useState([]);
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

  useEffect(() => {
    fetchSessions();
  }, [timetableId]);

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
                  fetchSessions={fetchSessions}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsManager;
