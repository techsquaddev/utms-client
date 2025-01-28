import { AlertModal, Modal, UpdateSession } from "..";
import { deleteSession } from "@/api/sessionApi";
import { toast } from "react-toastify";
import { formatTime, isCurrentSession } from "@/lib/utils";

const SessionCard = ({ session, currentDay, fetchTimetable }) => {
  const isHighlighted = isCurrentSession(
    session.time.startTime,
    session.time.endTime,
    currentDay
  );

  const editSessionDesc = "Edit session data here.",
    alertDesc =
      "This action cannot be undone. This will permanently delete selected session from the timetable.";

  const handleDelete = async () => {
    try {
      await deleteSession(session._id);
      toast.success("Session deleted successfully!");
      fetchTimetable();
    } catch (error) {
      toast.error("Failed to delete session. Please try again. 😟");
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg p-4 bg-white shadow-md m-4 max-w-sm ${
        isHighlighted ? "bg-yellow-100 border-yellow-400 shadow-lg" : ""
      }`}
    >
      <h3 className="text-lg font-medium mb-2 text-gray-800">
        {session.moduleName} ({session.moduleCode})
      </h3>
      <div className="space-y-1">
        <p className="text-gray-700">
          <strong className="text-gray-600">Day:</strong> {session.day}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Time:</strong>{" "}
          {formatTime(session.time.startTime)} -{" "}
          {formatTime(session.time.endTime)}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Type:</strong> {session.sessionType}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-600">Location:</strong>{" "}
          {session.location}
        </p>
        {session.coordinator && (
          <p className="text-gray-700">
            <strong className="text-gray-600">Coordinator:</strong>{" "}
            {session.coordinator}
          </p>
        )}
        {session.deliveryType && (
          <p className="text-gray-700">
            <strong className="text-gray-600">Delivery Type:</strong>{" "}
            {session.deliveryType}
          </p>
        )}
        {session.sessionLink && (
          <p className="text-gray-700">
            <strong className="text-gray-600">Link:</strong>{" "}
            <a href={session.sessionLink}>{session.sessionLink}</a>
          </p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Modal
          title="Edit Session Data"
          description={editSessionDesc}
          content={
            <UpdateSession
              currentSessionId={session._id}
              fetchTimetable={fetchTimetable}
            />
          }
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Update
          </button>
        </Modal>
        <AlertModal
          title="Confirm Deletion"
          description={alertDesc}
          action={() => handleDelete()}
        >
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete
          </button>
        </AlertModal>
      </div>
    </div>
  );
};

export default SessionCard;
