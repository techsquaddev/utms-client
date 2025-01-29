import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TimetableName } from "..";
import {
  getAllFaculties,
  getAllSpecsByFacultyId,
  getSpecificTimetable,
  updateTimetable,
} from "@/api/timetableApi";

const EditTimetable = ({ timetableId, fetchTimetable }) => {
  const [faculties, setFaculties] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [timetable, setTimetable] = useState({
    year: "",
    semester: "",
    batch: "",
    faculty: { code: "" },
    specialization: { code: "" },
    group: "",
    subGroup: "",
  });
  const [initialTimetable, setInitialTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setIsLoading(true);
        const response = await getSpecificTimetable(timetableId);
        setTimetable(response.data);
        setInitialTimetable(response.data);
        setSelectedFaculty(response.data.faculty._id);
      } catch (err) {
        toast.error("Failed to fetch timetable data! 😟");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetable();
  }, [timetableId]);

  // Fetch faculties on component mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setIsLoading(true);
        const response = await getAllFaculties();
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  // Fetch specializations whenever selectedFaculty changes
  useEffect(() => {
    if (selectedFaculty) {
      const fetchSpecializations = async () => {
        try {
          setIsLoading(true);
          const response = await getAllSpecsByFacultyId(selectedFaculty);
          setSpecializations(response.data);
        } catch (error) {
          console.error("Error fetching specializations:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSpecializations();
    } else {
      setSpecializations([]);
    }
  }, [selectedFaculty]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setTimetable({
  //     ...timetable,
  //     [name]: value,
  //   });

  //   if (name === "faculty") {
  //     setSelectedFaculty(value);
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTimetable((prevState) => {
      if (name === "faculty") {
        const selectedFaculty = faculties.find(
          (faculty) => faculty._id === value
        );
        return {
          ...prevState,
          faculty: selectedFaculty || { code: "" },
          specialization: { code: "" },
        };
      }
      if (name === "specialization") {
        const selectedSpecialization = specializations.find(
          (spec) => spec._id === value
        );
        return {
          ...prevState,
          specialization: selectedSpecialization || { code: "" },
        };
      }
      return { ...prevState, [name]: value };
    });

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(timetable) === JSON.stringify(initialTimetable)) {
      toast.warn("No changes made to update the timetable.");
      return;
    }

    try {
      setIsUpdating(true);
      const response = await updateTimetable(timetableId, timetable);
      toast.success("Timetable updated successfully! 🥳");
      fetchTimetable();
    } catch (err) {
      toast.error("Something went wrong! 🤨");
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
    <div className="flex flex-col">
      <TimetableName timetable={timetable} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Year:</label>
          <select
            name="year"
            value={timetable.year}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              Select a year
            </option>
            <option value="Y1">Year 1</option>
            <option value="Y2">Year 2</option>
            <option value="Y3">Year 3</option>
            <option value="Y4">Year 4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Semester:</label>
          <select
            name="semester"
            value={timetable.semester}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              Select a semester
            </option>
            <option value="S1">Semester 1</option>
            <option value="S2">Semester 2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Batch:</label>
          <select
            name="batch"
            value={timetable.batch}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              Select a batch
            </option>
            <option value="WE">Weekend</option>
            <option value="WD">Weekday</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Faculty:</label>
          <select
            name="faculty"
            value={timetable.faculty._id || ""}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              {isLoading ? "Loading faculties..." : "Select a faculty"}
            </option>
            {faculties.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Specialization:</label>
          <select
            name="specialization"
            value={timetable.specialization._id || ""}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              {isLoading
                ? "Loading specializations..."
                : "Select a specialization"}
            </option>
            {specializations.length > 0 ? (
              specializations.map((specialization) => (
                <option key={specialization._id} value={specialization._id}>
                  {specialization.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No specializations available
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Group:</label>
          <input
            type="number"
            name="group"
            placeholder="Group? (1,2,3...)"
            value={timetable.group}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sub Group:</label>
          <input
            type="number"
            name="subGroup"
            placeholder="Sub Group? (1,2,3...)"
            value={timetable.subGroup}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-6 py-3 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-md hover:bg-dark-blue transition-colors duration-300"
        >
          {isUpdating ? "Updating..." : "Update Timetable"}
        </button>
      </form>
    </div>
  );
};

export default EditTimetable;
