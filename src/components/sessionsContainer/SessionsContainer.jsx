/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './sessionsContainer.module.css';
import Session from '../session/Session';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SessionsContainer = ({ sessions }) => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const navigate = useNavigate();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const handleDayChange = (direction) => {
    setCurrentDay((prevDay) => {
      const newDay = (prevDay + direction + 7) % 7;
      return newDay;
    });
  };

  const backPage = async () => {
    const getCookies = Cookies.get('Time_Table_ID');
    if (getCookies) {
      Cookies.remove('Time_Table_ID');
      navigate('/timetables/find');
      window.location.reload();
    }
  };

  return (
    <div>
      <div className={styles.navigation}>
        <button onClick={() => handleDayChange(-1)}>Previous</button>
        <button onClick={() => handleDayChange(1)}>Next</button>
      </div>
      <div className={styles.navigation}>
        <button onClick={() => backPage()}>Back</button>
      </div>

      <div className={styles.dayTabs}>
        {days.map((day, index) => (
          <button
            key={index}
            className={currentDay === index ? styles.activeTab : ''}
            onClick={() => setCurrentDay(index)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className={styles.sessions}>
        {sessions
          .filter((session) => session.day === days[currentDay])
          .sort((a, b) => a.time.startTime.localeCompare(b.time.startTime))
          .map((session, idx) => (
            <Session
              key={idx}
              session={session}
              currentDay={currentDay === new Date().getDay()}
            />
          ))}
      </div>
    </div>
  );
};

export default SessionsContainer;
