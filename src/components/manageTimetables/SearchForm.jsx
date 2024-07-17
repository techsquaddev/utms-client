import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faculties, specializations } from "../../data";
import { toast } from "react-toastify";

import styles from "./searchForm.module.css";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SearchForm = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("FOC");
  const [formData, setFormData] = useState({
    year: "Y1",
    semester: "S1",
    batch: "WE",
    faculty: "FOC",
    specialization: "IT",
    group: 1,
    subGroup: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/timetable/find-timetable",
        formData
      );
      if (response.data) {
        toast.success("Timetable Found! 🥳");

        setFormData({
          year: "Y1",
          semester: "S1",
          batch: "WE",
          faculty: "FOC",
          specialization: "IT",
          group: 1,
          subGroup: "",
        });
        setSelectedFaculty("FOC");

        // Redirect to the timetable page
        navigate(`/timetables/${response.data._id}`);
      } else {
        toast.info("Couldn't find the timetable! 🤷");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Error finding timetable 😕");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-[#333333] rounded-3xl">
            Find your Timetable
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] max-w-content overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Look for your relevant timetable</DialogTitle>
            <DialogDescription>
              Fill in the following details and narrow down your search!
              <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label>Year:</label>
                    <select
                      name="year"
                      value={formData.year}
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
                      value={formData.semester}
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
                      value={formData.batch}
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
                      value={formData.faculty}
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
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                    >
                      {specializations[selectedFaculty] ? (
                        specializations[selectedFaculty].map(
                          (specialization) => (
                            <option key={specialization} value={specialization}>
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
                      value={formData.group}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Sub Group:</label>
                    <input
                      type="number"
                      name="subGroup"
                      value={formData.subGroup}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Find Timetable
                  </button>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchForm;
