import { useEffect, useState } from "react";
import styles from "./timetable.module.css";
import {
  Clock,
  SessionsContainer,
  TimetableName,
  Wrapper,
} from "../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sessionsData } from "../../components/session/sessionsData";
import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import timetableBg from "../../assets/timetable_bg.jpg";
import MiniTimetableCard from "@/components/miniTimetableCard/MiniTimetableCard";

const Timetable = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/timetable/${timetableId}`);
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

  const backPage = async () => {
    const timetableId = localStorage.getItem("timetableId");
    if (timetableId) {
      localStorage.removeItem("timetableId");
    }
    navigate("/timetables/find");
  };

  return (
    <div>
      <Wrapper>
        <button
          onClick={() => backPage()}
          className="mb-5 bg-soft-red border border-red-alert p-2 shadow-lg rounded-lg hover:bg-soft-gray transition-colors duration-300"
        >
          <ArrowBackIosNewIcon className="text-red-alert" />
        </button>
        <TimetableName timetable={timetable} />
        <MiniTimetableCard />
        <SessionsContainer sessions={sessionsData} />
      </Wrapper>
    </div>
  );
};

export default Timetable;
