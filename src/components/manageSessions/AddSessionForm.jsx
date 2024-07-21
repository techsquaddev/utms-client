import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./addSessionForm.module.css";
import { DialogTrigger } from "../ui/dialog";

const AddSessionForm = ({ timetableId }) => {
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
  const [currentSessionId, setCurrentSessionId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSession = await axios.post(`/api/session/${timetableId}`, {
        ...formState,
        time: {
          startTime: formatTime(formState.startTime),
          endTime: formatTime(formState.endTime),
        },
      });

      setSessions([...sessions, newSession.data]);

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

      setCurrentSessionId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formatTime = (time) => {
    // Assuming time is in format HH:mm
    return new Date(`1970-01-01T${time}:00`);
  };

  return (
    <div>
      <div>
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
              Add Session
            </button>
          </DialogTrigger>
        </form>
      </div>
    </div>
  );
};

export default AddSessionForm;
