import { useEffect, useState } from "react";
import styles from "./viewTimetable.module.css";
import { Clock, SessionsContainer } from "../../components";
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

const ViewTimetable = (props) => {
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/timetable/${props.id}`);
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
        <DialogContent className="h-[90vh] max-w-fit bg-[#f9f9f9]">
          <DialogTitle></DialogTitle>
          <DialogDescription className="overflow-y-auto scrollbar">
            <div className="mr-4">
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
                      <strong>Specialization:</strong>{" "}
                      {timetable.specialization}
                    </p>
                    <p>
                      <strong>Status:</strong> {timetable.status}
                    </p>
                  </div>

                  <div>
                    <Clock />
                  </div>
                  <SessionsContainer
                    sessions={timetable.sessions}
                    id={props.id}
                  />
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewTimetable;
