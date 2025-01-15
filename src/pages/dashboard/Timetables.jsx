import React, { useEffect, useState } from "react";
import axios from "axios";

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
import { BASE_URL } from "@/api/baseURL";
import SearchForm from "@/components/manageTimetables/SearchForm";
import AddTimetable from "@/components/manageTimetables/AddTimetable";
import ViewTimetable from "@/components/manageTimetables/ViewTimetable";
import EditTimetable from "@/components/manageTimetables/EditTimetable";
import { Button } from "@/components/ui/button";

const Timetables = ({ setActiveTab }) => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/timetables`);
        setTimetables(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchTimetables();
  }, []);

  const deleteTimetable = () => {};

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!timetables) {
    return <div>Where be the timetables?!</div>;
  }

  return (
    <div className="p-4 flex flex-col w-full h-[90%]">
      <div className="flex justify-between h-fit">
        <span className="text-2xl">Timetables</span>
      </div>
      <div className="flex mt-8 justify-between w-full">
        <SearchForm />
        <AddTimetable />
      </div>
      {/* List */}
      <div className="mt-6 px-8 h-inherit box-border overflow-y-auto scrollbar">
        {timetables.map((timetable) => (
          <div
            className="mt-4 px-5 flex justify-between items-center cursor-pointer rounded-xl bg-white hover:rounded-l-xl hover:bg-gray-100"
            key={timetable.name}
          >
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
                      onClick={() => deleteTimetable(timetable._id)}
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

export default Timetables;
