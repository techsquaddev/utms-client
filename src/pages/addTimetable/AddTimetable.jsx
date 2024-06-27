import React, { useState } from "react";
import styles from "./addTimetable.module.css";

const AddTimetable = () => {
  const [timetable, setTimetable] = useState({
    group: "",
    subGroup: "",
    year: "",
    semester: "",
    batch: "",
    faculty: "",
    specialization: "IT",
    status: "Pending",
    sessions: [],
  });

  const [session, setSession] = useState({
    day: "",
    time: { from: "", to: "" },
    moduleName: "",
    moduleCode: "",
    sessionType: "",
    coordinator: "",
    location: "",
    deliveryType: "",
  });

  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimetable({ ...timetable, [name]: value });
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    if (name === "from" || name === "to") {
      setSession({ ...session, time: { ...session.time, [name]: value } });
    } else {
      setSession({ ...session, [name]: value });
    }
  };

  const addOrUpdateSession = () => {
    if (editIndex === -1) {
      setTimetable({
        ...timetable,
        sessions: [...timetable.sessions, session],
      });
    } else {
      const updatedSessions = timetable.sessions.map((sess, index) =>
        index === editIndex ? session : sess
      );
      setTimetable({ ...timetable, sessions: updatedSessions });
      setEditIndex(-1);
    }

    setSession({
      day: "",
      time: { from: "", to: "" },
      moduleName: "",
      moduleCode: "",
      sessionType: "",
      coordinator: "",
      location: "",
      deliveryType: "",
    });
  };

  const editSession = (index) => {
    setSession(timetable.sessions[index]);
    setEditIndex(index);
  };

  const deleteSession = (index) => {
    const updatedSessions = timetable.sessions.filter((_, i) => i !== index);
    setTimetable({ ...timetable, sessions: updatedSessions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Timetable:", timetable);
    // Add logic to send timetable data to the server
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Add New Timetable</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Group:</label>
          <input
            type="text"
            name="group"
            value={timetable.group}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Sub Group:</label>
          <input
            type="text"
            name="subGroup"
            value={timetable.subGroup}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={timetable.year}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Semester:</label>
          <input
            type="text"
            name="semester"
            value={timetable.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Batch:</label>
          <input
            type="text"
            name="batch"
            value={timetable.batch}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Faculty:</label>
          <input
            type="text"
            name="faculty"
            value={timetable.faculty}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Specialization:</label>
          <select
            name="specialization"
            value={timetable.specialization}
            onChange={handleChange}
            required
          >
            <option value="IT">IT</option>
            <option value="SE">SE</option>
            <option value="IS">IS</option>
            <option value="CS">CS</option>
            <option value="DS">DS</option>
            <option value="CSNE">CSNE</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Status:</label>
          <select
            name="status"
            value={timetable.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Updated">Updated</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        <h2 className={styles.heading}>Add/Edit Session</h2>
        <div className={styles.field}>
          <label>Day:</label>
          <input
            type="text"
            name="day"
            value={session.day}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Time From:</label>
          <input
            type="time"
            name="from"
            value={session.time.from}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Time To:</label>
          <input
            type="time"
            name="to"
            value={session.time.to}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Module Name:</label>
          <input
            type="text"
            name="moduleName"
            value={session.moduleName}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Module Code:</label>
          <input
            type="text"
            name="moduleCode"
            value={session.moduleCode}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Session Type:</label>
          <input
            type="text"
            name="sessionType"
            value={session.sessionType}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Coordinator:</label>
          <input
            type="text"
            name="coordinator"
            value={session.coordinator}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={session.location}
            onChange={handleSessionChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Delivery Type:</label>
          <input
            type="text"
            name="deliveryType"
            value={session.deliveryType}
            onChange={handleSessionChange}
            required
          />
        </div>
        <button
          type="button"
          onClick={addOrUpdateSession}
          className={styles.addButton}
        >
          {editIndex === -1 ? "Add Session" : "Update Session"}
        </button>

        <button type="submit" className={styles.submitButton}>
          Submit Timetable
        </button>
      </form>

      <h2 className={styles.heading}>Sessions</h2>
      <ul className={styles.sessionList}>
        {timetable.sessions.map((sess, index) => (
          <li key={index} className={styles.sessionItem}>
            {sess.day} {sess.time.from}-{sess.time.to} {sess.moduleName} (
            {sess.moduleCode}) - {sess.coordinator}
            <button
              onClick={() => editSession(index)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => deleteSession(index)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTimetable;
