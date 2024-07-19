import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TimetableCard, SessionCard, SessionsManager } from "../../components";

import styles from "./addSessions.module.css";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddSession = (props) => {
  // const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [formState, setFormState] = useState({
    day: "",
    startTime: "",
    endTime: "",
    moduleName: "",
    moduleCode: "",
    sessionType: "",
    location: "",
    coordinator: "",
    deliveryType: "",
    sessionLink: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const fetchTimetableAndSessions = async () => {
      try {
        const timetableResponse = await axios.get(`/api/timetable/${props.id}`);
        setTimetable(timetableResponse.data);
        const sessionsResponse = await axios.get(`/api/session`);
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching timetable and sessions:", error);
      }
    };
    fetchTimetableAndSessions();
  }, [props.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(`/api/session/${currentSessionId}`, {
          ...formState,
          time: {
            startTime: formatTime(formState.startTime),
            endTime: formatTime(formState.endTime),
          },
        });
        setSessions(
          sessions.map((session) =>
            session._id === currentSessionId
              ? {
                  ...session,
                  ...formState,
                  time: {
                    startTime: formatTime(formState.startTime),
                    endTime: formatTime(formState.endTime),
                  },
                }
              : session
          )
        );
      } else {
        const newSession = await axios.post(`/api/session/${props.id}`, {
          ...formState,
          time: {
            startTime: formatTime(formState.startTime),
            endTime: formatTime(formState.endTime),
          },
        });
        setSessions([...sessions, newSession.data]);
      }
      setFormState({
        day: "",
        startTime: "",
        endTime: "",
        moduleName: "",
        moduleCode: "",
        sessionType: "",
        location: "",
        coordinator: "",
        deliveryType: "",
        sessionLink: "",
      });
      setIsUpdate(false);
      setCurrentSessionId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = (session) => {
    setFormState({
      day: session.day,
      startTime: session.time.startTime,
      endTime: session.time.endTime,
      moduleName: session.moduleName,
      moduleCode: session.moduleCode,
      sessionType: session.sessionType,
      location: session.location,
      coordinator: session.coordinator,
      deliveryType: session.deliveryType,
      sessionLink: session.sessionLink,
    });
    setIsUpdate(true);
    setCurrentSessionId(session._id);
  };

  const formatTime = (time) => {
    // Assuming time is in format HH:mm
    return new Date(`1970-01-01T${time}:00`);
  };

  const handleDelete = async (session) => {
    try {
      await axios.delete(`/api/session/${session._id}`);
      setSessions(sessions.filter((s) => s._id !== session._id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-[#333333] rounded-3xl">
            Create New Session
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] max-w-max overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
            <DialogDescription>
              Fill in the following details to add a new Session.
              <div className={styles.container}>
                {timetable && <TimetableCard timetable={timetable} />}

                <SessionsManager timetableId={props.id} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSession;
