import { useEffect, useState } from "react";
import { SessionsContainer, TimetableName } from "../../components";
import axios from "axios";

const ViewTimetable = (props) => {
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/timetables/${props.id}`);
        setTimetable(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchTimetable();
  }, [props.id]);

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

  return (
    <div>
      <TimetableName timetable={timetable} />
      <SessionsContainer sessions={timetable.sessions} />
    </div>
  );
};

export default ViewTimetable;
