import React, { useState, useEffect } from "react";
import { getSpecificSession, updateSession } from "@/api/sessionApi";
import { toast } from "react-toastify";

const UpdateSession = ({ currentSessionId, fetchTimetable }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formState, setFormState] = useState({
    day: "",
    time: {
      startTime: "",
      endTime: "",
    },
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
        setIsLoading(true);
        const response = await getSpecificSession(currentSessionId);
        setFormState({
          ...response.data,
          time: {
            startTime: response.data.time?.startTime || "",
            endTime: response.data.time?.endTime || "",
          },
        });
      } catch (err) {
        toast.error("Error fetching session 😟");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [currentSessionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name is part of the `time` object
    if (name === "startTime" || name === "endTime") {
      setFormState((prev) => ({
        ...prev,
        time: {
          ...prev.time,
          [name]: value,
        },
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate time
    if (formState.time.startTime >= formState.time.endTime) {
      toast.error("End time must be after start time. 🤔");
      return;
    }

    try {
      setIsUpdating(true);
      await updateSession(currentSessionId, formState);
      fetchTimetable();
      toast.success("Session updated successfully! 🥳");
    } catch (err) {
      toast.error("Failed to update session. Please try again. 😟");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">Data is loading...</div>
    );
  }

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
          value={formState.time.startTime}
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
          value={formState.time.endTime}
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
          value={formState.location}
          onChange={handleChange}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          required
        />
      </label>
      <label className="mb-2">
        Coordinator:
        <input
          type="text"
          name="coordinator"
          value={formState.coordinator}
          className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          onChange={handleChange}
        />
      </label>
      <label className="mb-2">
        Delivery Type:
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
          Session Link:
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
        {isUpdating ? "Updating..." : "Update Session"}
      </button>
    </form>
  );
};

export default UpdateSession;
