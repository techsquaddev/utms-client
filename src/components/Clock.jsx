import React, { useEffect, useState } from "react";
import { AccessTime, Event } from "@mui/icons-material";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col gap-1.5 items-end">
      <div className="flex items-center gap-2 p-2 bg-soft-gray rounded-md border border-border shadow-md">
        <AccessTime className="text-soft-text" />
        <div
          className="text-base font-bold  text-soft-text"
          style={{ width: "fit-content" }}
        >
          {formatTime(currentTime)}
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-soft-gray rounded-md border border-border shadow-md">
        <Event className="text-soft-text" />
        <div
          className="text-lg font-bold text-soft-text"
          style={{ width: "fit-content" }}
        >
          {getCurrentDate()}
        </div>
      </div>
    </div>
  );
};

export default Clock;
