import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time) => {
  const date = new Date(`1970-01-01T${time}:00Z`);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const isCurrentSession = (startTime, endTime, currentDay) => {
  const now = new Date();

  // Parse start and end times
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  // Create Date objects for session start and end times
  const sessionStart = new Date();
  sessionStart.setHours(startHours, startMinutes, 0, 0);

  const sessionEnd = new Date();
  sessionEnd.setHours(endHours, endMinutes, 0, 0);

  // Check if the current time is within the session range
  return currentDay && now >= sessionStart && now <= sessionEnd;
};
