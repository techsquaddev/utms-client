import React, { useState } from "react";
import { createSession } from "@/api/sessionApi";
import { toast } from "react-toastify";

const AddSession = ({ timetableId, fetchTimetable }) => {
  const [isAdding, setIsAdding] = useState(false);
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

  const days = [
    "Select Day",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate time
    if (formState.startTime >= formState.endTime) {
      toast.error("End time must be after start time. 🤔");
      return;
    }

    try {
      setIsAdding(true);
      await createSession(timetableId, formState);
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
      fetchTimetable();
      toast.success("Session created successfully! 🥳");
    } catch (err) {
      toast.error("Failed to add session. Please try again. 😟");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="mb-2">
        Day:
        <select
          name="day"
          value={formState.day}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        >
          {days.map((day, index) => (
            <option
              key={day}
              value={index === 0 ? "" : day}
              disabled={index === 0}
            >
              {day}
            </option>
          ))}
        </select>
      </label>
      <label className="mb-2">
        Start Time:
        <input
          type="time"
          name="startTime"
          value={formState.startTime}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        End Time:
        <input
          type="time"
          name="endTime"
          value={formState.endTime}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        Module Name:
        <input
          type="text"
          name="moduleName"
          placeholder="OOP, DSA..."
          value={formState.moduleName}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        Module Code:
        <input
          type="text"
          name="moduleCode"
          placeholder="ITXXXXX"
          value={formState.moduleCode}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        Session Type:
        <select
          name="sessionType"
          value={formState.sessionType}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        >
          <option value="">Select</option>
          <option value="Lecture">Lecture</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Lecture + Tutorial">Lecture + Tutorial</option>
          <option value="Practical">Practical</option>
          <option value="Practical BYOD">Practical BYOD</option>
        </select>
      </label>
      <label className="mb-2">
        Location:
        <input
          type="text"
          name="location"
          placeholder="A502, F301..."
          value={formState.location}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        Coordinator (optional):
        <input
          type="text"
          name="coordinator"
          placeholder="Mr. Ashen Fernando"
          value={formState.coordinator}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          onChange={handleChange}
        />
      </label>
      <label className="mb-2">
        Delivery Type (optional):
        <select
          name="deliveryType"
          value={formState.deliveryType}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
        >
          <option value="">Select</option>
          <option value="Physical">Physical</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>
      {(formState.deliveryType === "Online" ||
        formState.deliveryType === "Hybrid") && (
        <label className="mb-2">
          Session Link (optional):
          <input
            type="url"
            name="sessionLink"
            value={formState.sessionLink}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            onChange={handleChange}
          />
        </label>
      )}
      <button
        type="submit"
        className="mt-4 px-6 py-3 w-full text-xl font-semibold bg-green-600 shadow-lg text-white rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        {isAdding ? "Adding..." : "Add Session"}
      </button>
    </form>
  );
};

export default AddSession;
