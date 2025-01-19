import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AddSession,
  Modal,
  SessionBoard,
  SessionCard,
  TimetableCard,
} from "@/components";
import { BASE_URL } from "@/api/baseURL";
import { useParams } from "react-router-dom";

const Sessions = () => {
  const { timetableId } = useParams();
  const [timetable, setTimetable] = useState(null);
  const [sessions, setSessions] = useState([]);
  const addSessionDesc = "Add a new session.";

  const fetchTimetable = async () => {
    try {
      const timetableResponse = await axios.get(
        `${BASE_URL}/api/timetables/${timetableId}`
      );
      setTimetable(timetableResponse.data);
    } catch (error) {
      console.error("Error fetching timetable", error);
    }
  };

  const fetchSessions = async () => {
    try {
      const sessionsResponse = await axios.get(
        `${BASE_URL}/api/sessions/find/${timetableId}`
      );
      setSessions(sessionsResponse.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchTimetable();
    fetchSessions();
  }, [timetableId]);

  return (
    <div>
      <h2 className="text-2xl mb-8">Manage Sessions</h2>
      <div className="flex items-start gap-8">
        <div>
          {timetable && <TimetableCard timetable={timetable} />}
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
