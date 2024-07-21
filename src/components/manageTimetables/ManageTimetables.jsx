import React, { useEffect, useState } from "react";
import styles from "./manageTimetables.module.css";
import axios from "axios";

import { deleteTimeTable } from "@/api/timetableApi";

import { Button } from "../ui/button";

import SearchForm from "./SearchForm";
import AddTimetable from "./AddTimetable";
import EditTimetable from "./EditTimetable";
import ViewTimetable from "./ViewTimetable";
import ManageSessions from "../manageSessions/ManageSessions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageTimetables = ({ setActiveTab }) => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get(`/api/timetable/`);
        setTimetables(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchTimetables();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!timetables) {
    return <div>Where be the timetables?!</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="text-2xl">TimeTables</span>
      </div>
      <div className={styles.findAddDiv}>
        <SearchForm />
        <AddTimetable />
      </div>
      {/* List */}
      <div className={`${styles.tbList} overflow-y-auto scrollbar`}>
        {timetables.map((timetable) => (
          <div className={styles.listItem} key={timetable.name}>
            <ViewTimetable name={timetable.name} id={timetable._id} />
            <div className="flex">
              <Button
                name="manage"
                key={`manage-${timetable.name}`}
                className="bg-[#333333] rounded-none text-white"
                onClick={() => {
                  setActiveTab("sessions", {
                    id: timetable._id,
                    name: timetable.name,
                  });
                }}
              >
                <span>Manage Sessions</span>
              </Button>
              <EditTimetable
                key={`edit-${timetable.name}`}
                id={timetable._id}
              />
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    name="delete"
                    key={`delete-${timetable.name}`}
                    className="bg-[#333333] rounded-none rounded-r-2xl text-white"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      selected timetable and all sessions associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteTimeTable(timetable._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTimetables;
