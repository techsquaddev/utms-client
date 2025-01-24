import React, { useState } from "react";
import { SessionCard } from "..";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const SessionBoard = ({ sessions, fetchTimetable }) => {
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
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-soft-blue p-2 shadow-lg rounded-full border border-primary hover:bg-soft-gray transition-colors duration-300"
          onClick={() => handleDayChange(-1)}
        >
          <ArrowBackIosNew className="text-primary" />
        </button>
        <h3 className="text-2xl text-soft-text font-semibold text-center">
          {days[currentDay]}
        </h3>
        <button
          className="bg-soft-blue p-2 shadow-lg rounded-full border border-primary hover:bg-soft-gray transition-colors duration-300"
          onClick={() => handleDayChange(1)}
        >
          <ArrowForwardIos className="text-primary" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mb-5">
        {days.map((day, index) => (
          <button
            key={index}
            className={`${
              currentDay === index ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-3 py-1 rounded transition hover:bg-gray-300`}
            onClick={() => setCurrentDay(index)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {sessions
          .filter((session) => session.day === days[currentDay])
          .sort((a, b) => {
            const [aHours, aMinutes] = a.time.startTime.split(":").map(Number);
            const [bHours, bMinutes] = b.time.startTime.split(":").map(Number);

            // Convert time to total minutes for comparison
            const aTotalMinutes = aHours * 60 + aMinutes;
            const bTotalMinutes = bHours * 60 + bMinutes;

            return aTotalMinutes - bTotalMinutes;
          })
          .map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              fetchTimetable={fetchTimetable}
            />
          ))}
      </div>
    </div>
  );
};

export default SessionBoard;
