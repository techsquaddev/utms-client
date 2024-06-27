import React, { useEffect, useState } from "react";
import styles from "./timetable.module.css";
import { Session } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sessionsData } from "../../components/session/sessionsData";

const Timetable = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentDay,
    afterChange: (current) => setCurrentDay(current),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDay(now.getDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timetable}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Y4.S1.WE.FOC.SE.1.1</h1>
        <div className={styles.info}>
          <p>
            <strong>Group:</strong> 1
          </p>
          <p>
            <strong>Sub Group:</strong> 1
          </p>
          <p>
            <strong>Year:</strong> 4
          </p>
          <p>
            <strong>Semester:</strong> 1
          </p>
          <p>
            <strong>Batch:</strong> WE
          </p>
          <p>
            <strong>Faculty:</strong> FOC
          </p>
          <p>
            <strong>Specialization:</strong> SE
          </p>
          <p>
            <strong>Status:</strong> Approved
          </p>
        </div>
        <div>
          <Slider {...settings}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div key={index}>
                {sessionsData
                  .filter((session) => session.day === day)
                  .map((session, idx) => (
                    <Session
                      key={idx}
                      session={session}
                      currentDay={currentDay === index}
                    />
                  ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
