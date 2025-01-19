import React, { useState } from "react";
import { SessionCard } from "..";

const SessionBoard = ({ sessions, fetchSessions }) => {
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
  return (
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
  );
};

export default SessionBoard;
