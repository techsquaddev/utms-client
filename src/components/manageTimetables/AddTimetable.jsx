import React, { useState } from "react";

import styles from "./addTimetable.module.css";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { faculties, specializations } from "../../data";
import axios from "axios";
import { toast } from "react-toastify";
import { TimetableName } from "../../components";

const AddTimetable = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [timetable, setTimetable] = useState({
    year: "Y1",
    semester: "S1",
    batch: "WE",
    faculty: "FOC",
    specialization: "IT",
    group: 1,
    subGroup: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTimetable({
      ...timetable,
      [name]: value,
    });

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/timetable", timetable);
      toast.success("Timetable created successfully! 🥳");
      // Set form data after submit the timetable
      setTimetable({
        year: "Y1",
        semester: "S1",
        batch: "WE",
        faculty: "FOC",
        specialization: "IT",
        group: 1,
        subGroup: "",
      });
      setSelectedFaculty("FOC");
    } catch (err) {
      toast.error("Something went wrong! 🤨");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-[#333333] rounded-3xl">
            Add New Timetable
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] max-w-content overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Add New Timetable</DialogTitle>
            <DialogDescription>
              Fill in the following details to add a new timetable.
              <div>
                <div className={styles.formContainer}>
                  <TimetableName timetable={timetable} />
                  <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                      <label>Year:</label>
                      <select
                        name="year"
                        value={timetable.year}
                        onChange={handleChange}
                        required
                      >
                        <option value="Y1">Y1</option>
                        <option value="Y2">Y2</option>
                        <option value="Y3">Y3</option>
                        <option value="Y4">Y4</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Semester:</label>
                      <select
                        name="semester"
                        value={timetable.semester}
                        onChange={handleChange}
                        required
                      >
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Batch:</label>
                      <select
                        name="batch"
                        value={timetable.batch}
                        onChange={handleChange}
                        required
                      >
                        <option value="WE">WE</option>
                        <option value="WD">WD</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Faculty:</label>
                      <select
                        name="faculty"
                        value={timetable.faculty}
                        onChange={handleChange}
                        required
                      >
                        {faculties.map((faculty) => (
                          <option key={faculty} value={faculty}>
                            {faculty}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Specialization:</label>
                      <select
                        name="specialization"
                        value={timetable.specialization}
                        onChange={handleChange}
                        required
                      >
                        {specializations[selectedFaculty] ? (
                          specializations[selectedFaculty].map(
                            (specialization) => (
                              <option
                                key={specialization}
                                value={specialization}
                              >
                                {specialization}
                              </option>
                            )
                          )
                        ) : (
                          <option value="" disabled>
                            No specializations available
                          </option>
                        )}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Group:</label>
                      <input
                        type="number"
                        name="group"
                        value={timetable.group}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Sub Group:</label>
                      <input
                        type="number"
                        name="subGroup"
                        value={timetable.subGroup}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Add Timetable
                    </button>
                  </form>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTimetable;
