/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Session from "./Session";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { YTup } from "@/assets";

const SessionsContainer = ({ sessions }) => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const filteredSessions = sessions
    .filter((session) => session.day === days[currentDay])
    .sort((a, b) => a.time.startTime.localeCompare(b.time.startTime));

  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between my-7">
        <button
          onClick={() => handleDayChange(-1)}
          className="bg-soft-blue p-2 shadow-lg rounded-full border border-primary hover:bg-soft-gray transition-colors duration-300"
        >
          <ArrowBackIosNew className="text-primary" />
        </button>
        <h3 className="text-2xl text-soft-text font-bold text-center">
          {days[currentDay]}
        </h3>
        <button
          onClick={() => handleDayChange(1)}
          className="bg-soft-blue p-2 shadow-lg rounded-full border border-primary hover:bg-soft-gray transition-colors duration-300"
        >
          <ArrowForwardIos className="text-primary" />
        </button>
      </div>

      <div className="flex justify-center mb-5 gap-1.5">
        {shortDays.map((day, index) => (
          <button
            key={index}
            className={`py-1 px-2 rounded-xl text-xs ${
              currentDay === index
                ? "bg-primary text-white border border-primary"
                : "bg-white text-soft-text border border-border"
            } md:text-sm`}
            onClick={() => setCurrentDay(index)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-[20px]">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session, idx) => (
            <Session
              key={idx}
              session={session}
              currentDay={currentDay === new Date().getDay()}
            />
          ))
        ) : (
          <div className="mt-7 flex flex-col justify-center items-center">
            <h3 className="text-soft-text text-lg mb-3">
              No sessions available! 😀🎉
            </h3>
            <img src={YTup} alt="No sessions available" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsContainer;
