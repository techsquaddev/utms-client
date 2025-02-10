import React, { useEffect, useState } from "react";
import {
  AddSession,
  DataLoader,
  Modal,
  SessionBoard,
  TimetableCard,
} from "@/components";
import { useParams } from "react-router-dom";
import { getSpecificTimetable } from "@/api/timetableApi";
import { toast } from "react-toastify";

const Sessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addSessionDesc = "Add a new session.";

  const fetchTimetable = async () => {
    try {
      setIsLoading(true);
      const response = await getSpecificTimetable(timetableId);
      setTimetable(response.data);
      setSessions(response.data.sessions);
    } catch (error) {
      toast.error("Failed to fetch timetable! 😕");
    } finally {
      setIsLoading(false);
    }
  };

  // This function also can be used to fetch sessions.
  // const fetchSessions = async () => {
  //   try {
  //     const response = await getAllSessionsByTimetableId(timetableId);
  //     setSessions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching sessions:", error);
  //   }
  // };

  useEffect(() => {
    fetchTimetable();
  }, [timetableId]);

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div>
      <h2 className="text-2xl mb-16">Manage Sessions</h2>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          {timetable && (
            <TimetableCard
              timetable={timetable}
              fetchTimetable={fetchTimetable}
            />
          )}
          <div className="flex justify-center w-full">
            <Modal
              title="Add Session Data"
              description={addSessionDesc}
              content={
                <AddSession
                  timetableId={timetableId}
                  fetchTimetable={fetchTimetable}
                />
              }
            >
              <button className="mt-5 min-w-full px-5 py-2 bg-green-600 text-white rounded cursor-pointer self-center hover:bg-green-700">
                Add a session
              </button>
            </Modal>
          </div>
        </div>
        <div className="flex-2">
          <SessionBoard sessions={sessions} fetchTimetable={fetchTimetable} />
        </div>
      </div>
    </div>
  );
};

export default Sessions;
