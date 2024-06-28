import React, { useEffect, useState } from "react";
import styles from "./clock.module.css";

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
  return (
    <div>
      <div className={styles.clock}>{formatTime(currentTime)}</div>
    </div>
  );
};

export default Clock;
