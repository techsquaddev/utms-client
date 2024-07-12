import React from "react";
import styles from "./manageTimetables.module.css";

import { Button } from "../ui/button";

import SearchForm from "./SearchForm";
import AddTimetable from "./AddTimetable";

const ManageTimetables = () => {
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
            >
              <span>Manage Sessions</span>
            </Button>
            <Button
              name="edit"
              className="bg-[#333333] rounded-none text-white border border-white/20"
            >
              <span>Edit</span>
            </Button>
            <Button
              name="delete"
              className="bg-[#333333] rounded-none rounded-r-2xl text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTimetables;
