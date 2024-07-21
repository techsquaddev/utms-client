import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./addSessionForm.module.css";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UpdateSession = ({ session }) => {
  const [formState, setFormState] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`/api/session/${session._id}`, {
        ...formState,
        time: {
          startTime: formatTime(formState.startTime),
          endTime: formatTime(formState.endTime),
        },
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error updating session:", error);
      setIsSubmitting(false);
    }
  };

  const formatTime = (time) => {
    // Assuming time is in format HH:mm
    return new Date(`1970-01-01T${time}:00`);
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <Button className="w-24 bg-[#333333] rounded-full">Update</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] max-w-max overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Session</DialogTitle>
          <DialogDescription>
            <div>Something feels wrong? </div>
            <div>Make your corrections by editing the details here.</div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Day:
                <input
                  type="text"
                  name="day"
                  value={formState.day}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Start Time:
                <input
                  type="time"
                  name="startTime"
                  value={formState.startTime}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="time"
                  name="endTime"
                  value={formState.endTime}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Module Name:
                <input
                  type="text"
                  name="moduleName"
                  value={formState.moduleName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Module Code:
                <input
                  type="text"
                  name="moduleCode"
                  value={formState.moduleCode}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Session Type:
                <select
                  name="sessionType"
                  value={formState.sessionType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Lecture + Tutorial">Lecture + Tutorial</option>
                  <option value="Practical">Practical</option>
                </select>
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Coordinator:
                <input
                  type="text"
                  name="coordinator"
                  value={formState.coordinator}
                  onChange={handleChange}
                />
              </label>
              <label>
                Delivery Type:
                <select
                  name="deliveryType"
                  value={formState.deliveryType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Physical">Physical</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
              {(formState.deliveryType === "Online" ||
                formState.deliveryType === "Hybrid") && (
                <label>
                  Session Link:
                  <input
                    type="url"
                    name="sessionLink"
                    value={formState.sessionLink}
                    onChange={handleChange}
                  />
                </label>
              )}
              <DialogTrigger>
                <button type="submit" className={styles.submitButton}>
                  Update Session
                </button>
              </DialogTrigger>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSession;
