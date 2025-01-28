import React, { useEffect, useState } from "react";
import { AddSession, Modal, SessionBoard, TimetableCard } from "@/components";
import { useParams } from "react-router-dom";
import { getSpecificTimetable } from "@/api/timetableApi";
import { toast } from "react-toastify";

const Sessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const addSessionDesc = "Add a new session.";

  const fetchTimetable = async () => {
    try {
      const response = await getSpecificTimetable(timetableId);
      setTimetable(response.data);
      setSessions(response.data.sessions);
    } catch (error) {
      toast.error("Failed to fetch timetable! 😕");
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

  return (
    <div>
      <h2 className="text-2xl mb-8">Manage Sessions</h2>
      <div className="flex items-start gap-8">
        <div>
          {timetable && (
            <TimetableCard
              timetable={timetable}
              fetchTimetable={fetchTimetable}
            />
          )}
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
            <button className="mt-5 px-5 py-2 bg-green-600 text-white rounded cursor-pointer self-center hover:bg-green-700">
              Add a session
            </button>
          </Modal>
        </div>
        <div>
          <SessionBoard sessions={sessions} fetchTimetable={fetchTimetable} />
        </div>
      </div>
    </div>
  );
};

export default Sessions;
