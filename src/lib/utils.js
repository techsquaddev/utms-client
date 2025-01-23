import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
