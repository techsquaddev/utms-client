import { useEffect, useState } from "react";
import { SessionsContainer, TimetableName } from "../../components";
import { getSpecificTimetable } from "@/api/timetableApi";

const ViewTimetable = ({ timetableId }) => {
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await getSpecificTimetable(timetableId);
        setTimetable(response.data);
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

  return (
    <div>
      <TimetableName timetable={timetable} />
      <SessionsContainer sessions={timetable.sessions} />
    </div>
  );
};

export default ViewTimetable;
