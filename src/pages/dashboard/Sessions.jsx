import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddSession, Modal, SessionCard, TimetableCard } from "@/components";
import { BASE_URL } from "@/api/baseURL";
import { useParams } from "react-router-dom";

const Sessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const addSessionDesc = "Add a new session.";

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
    fetchTimetable();
    fetchSessions();
  }, [timetableId]);

  // From sessions container
  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  return (
    <div className="flex flex-row items-start gap-8 mt-8">
      {timetable && <TimetableCard timetable={timetable} />}
      <Modal
        title="Edit Session Data"
        description={addSessionDesc}
        content={
          <AddSession timetableId={timetableId} fetchSessions={fetchSessions} />
        }
      >
        <button className="mt-5 px-5 py-2 bg-green-600 text-white rounded cursor-pointer self-center hover:bg-green-700">
          Add a session
        </button>
      </Modal>
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

export default Sessions;
