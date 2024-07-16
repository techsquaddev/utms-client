import React from "react";
import styles from "./manageTimetables.module.css";

import { Button } from "../ui/button";

import SearchForm from "./SearchForm";
import AddTimetable from "./AddTimetable";
import EditTimetable from "./EditTimetable";

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
      <div className={`${styles.tbList} overflow-y-scroll`}>
        <div className={styles.listItem}>
          <span>Timetable Name</span>
          <div className="flex">
            <Button
              name="edit"
              className="bg-[#333333] rounded-none text-white"
              onClick={() => setActiveTab("sessions")}
            >
              <span>Manage Sessions</span>
            </Button>
            <EditTimetable />
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  name="delete"
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
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTimetables;
