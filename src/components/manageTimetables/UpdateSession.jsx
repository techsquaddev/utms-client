import React, { useState, useEffect } from "react";
import { getSpecificSession, updateSession } from "@/api/sessionApi";
import { toast } from "react-toastify";

const UpdateSession = ({ currentSessionId, fetchTimetable }) => {
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSpecificSession(currentSessionId);
        setFormState(response.data);
      } catch (err) {
        toast.error("Error fetching session 😟");
      }
    };
    fetchSession();
  }, [currentSessionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSession(currentSessionId, formState);
      fetchTimetable();
      toast.success("Session updated successfully! 🥳");
    } catch (err) {
      toast.error("Failed to update session. Please try again. 😟");
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
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        >
          {days.map((day) => (
            <option key={day} value={day}>
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
          className="mt-1 p-2 border border-gray-300 rounded w-full"
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
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </label>
      <label className="mb-2">
        Module Name:
        <input
          type="text"
          name="moduleName"
          value={formState.moduleName}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </label>
      <label className="mb-2">
        Module Code:
        <input
          type="text"
          name="moduleCode"
          value={formState.moduleCode}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </label>
      <label className="mb-2">
        Session Type:
        <select
          name="sessionType"
          value={formState.sessionType}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
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
          value={formState.location}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </label>
      <label className="mb-2">
        Coordinator:
        <input
          type="text"
          name="coordinator"
          value={formState.coordinator}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          onChange={handleChange}
        />
      </label>
      <label className="mb-2">
        Delivery Type:
        <select
          name="deliveryType"
          value={formState.deliveryType}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
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
          Session Link:
          <input
            type="url"
            name="sessionLink"
            value={formState.sessionLink}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            onChange={handleChange}
          />
        </label>
      )}
      <button
        type="submit"
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded cursor-pointer self-center hover:bg-blue-700"
      >
        Update Session
      </button>
    </form>
  );
};

export default UpdateSession;
