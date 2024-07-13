import React, { useEffect, useState } from 'react';
import styles from './timetable.module.css';
import { Clock, TimetableCard, SessionsContainer } from '../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sessionsData } from '../../components/session/sessionsData';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Timetable = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/timetable/${timetableId}`);
        setTimetable(response.data);
        localStorage.setItem('Time_Table', JSON.stringify(response.data));
        Cookies.set('Name', response.data.name, {
          expires: new Date().getUTCFullYear() + 1,
        });
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchTimetable();
  }, [timetableId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDay(now.getDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!timetable) {
    return <div>Loading...</div>;
  }
  // const saveToLocalStorage = () => {
  //   if (localStorage.getItem('Time_Table')) {
  //     return localStorage.getItem('Time_Table');
  //   } else {
  //     localStorage.setItem('Time_Table', JSON.stringify(timetable));
  //   }
  // };

  return (
    <div className={styles.timetable}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{timetable.name}</h1>
        <div className={styles.info}>
          <p>
            <strong>Group:</strong> {timetable.group}
          </p>
          {timetable.subGroup && (
            <p>
              <strong>Sub Group:</strong> {timetable.subGroup}
            </p>
          )}
          <p>
            <strong>Year:</strong> {timetable.year}
          </p>
          <p>
            <strong>Semester:</strong> {timetable.semester}
          </p>
          <p>
            <strong>Batch:</strong> {timetable.batch}
          </p>
          <p>
            <strong>Faculty:</strong> {timetable.faculty}
          </p>
          <p>
            <strong>Specialization:</strong> {timetable.specialization}
          </p>
          <p>
            <strong>Status:</strong> {timetable.status}
          </p>
        </div>

        <div>
          <Clock />
        </div>
        {/* local storage save button */}
        {/* <div className={styles.navigation}>
          <button onClick={() => saveToLocalStorage()}>Save Timetable</button>
        </div> */}
        {/* end */}

        <SessionsContainer sessions={sessionsData} />
      </div>
    </div>
  );
};

export default Timetable;
