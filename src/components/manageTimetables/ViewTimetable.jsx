import { useEffect, useState } from "react";
import styles from "./viewTimetable.module.css";
import { Clock, SessionsContainer, TimetableName } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MiniTimetableCard from "../MiniTimetableCard";

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
    <div className="w-full">
      <Dialog>
        <DialogTrigger className="w-full justify-start flex">
          <span>{timetable.name}</span>
        </DialogTrigger>
        <DialogContent className="h-[90vh] max-w-lg bg-[#f9f9f9] overflow-y-auto scrollbar">
          <DialogTitle></DialogTitle>
          <TimetableName timetable={timetable} />
          <SessionsContainer sessions={timetable.sessions} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewTimetable;
